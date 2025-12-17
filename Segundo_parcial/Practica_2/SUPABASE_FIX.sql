-- SUPABASE FIX: Agregar columnas faltantes y ajustar schema

-- 1. Agregar columna 'status' a webhook_events (para consultas rápidas)
ALTER TABLE webhook_events 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending' 
CHECK (status IN ('pending', 'processed', 'failed', 'success'));

-- 2. Agregar indices para performance
CREATE INDEX IF NOT EXISTS idx_webhook_events_event_type ON webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_webhook_events_status ON webhook_events(status);
CREATE INDEX IF NOT EXISTS idx_webhook_events_created ON webhook_events(received_at DESC);
CREATE INDEX IF NOT EXISTS idx_webhook_subscriptions_active ON webhook_subscriptions(event_type, is_active);
CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_event ON webhook_deliveries(event_id);
CREATE INDEX IF NOT EXISTS idx_dlq_messages_status ON dlq_messages(status);

-- 3. Crear trigger para actualizar status automaticamente
CREATE OR REPLACE FUNCTION update_webhook_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE webhook_events 
  SET status = 'processed' 
  WHERE event_id = NEW.event_id AND status = 'pending';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Eliminar trigger si existe (compatible con Supabase)
BEGIN
  DROP TRIGGER trigger_webhook_delivery_success ON webhook_deliveries;
EXCEPTION WHEN UNDEFINED_OBJECT THEN
  NULL;
END;
$$;

CREATE TRIGGER trigger_webhook_delivery_success
AFTER INSERT ON webhook_deliveries
FOR EACH ROW
WHEN (NEW.status = 'success')
EXECUTE FUNCTION update_webhook_status();

-- Verificar estructura
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'webhook_events'
ORDER BY ordinal_position;
