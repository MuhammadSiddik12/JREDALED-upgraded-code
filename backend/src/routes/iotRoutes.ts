import { Router } from 'express';
import { handleTelemetry, handleCommandPoll } from '../controllers/iotController.js';

const router = Router();

// Hardware telemetry and command polling (no JWT auth required for field devices)
router.get('/k', handleTelemetry);
router.post('/k', handleTelemetry);
router.get('/cmd', handleCommandPoll);
router.post('/cmd', handleCommandPoll);

// PHP backwards compatibility paths
router.get('/k.php', handleTelemetry);
router.post('/k.php', handleTelemetry);
router.get('/Cmd.php', handleCommandPoll);
router.post('/Cmd.php', handleCommandPoll);

export default router;
