const fs=require('fs'),path=require('path');
const required=[
'package.json','package-lock.json','prisma/schema.prisma','Dockerfile','Dockerfile.worker','docker-compose.certification.yml',
'.github/workflows/production-certification.yml','app/api/health/live/route.ts','app/api/health/ready/route.ts',
'app/api/health/metrics/route.ts','workers/domain-worker.ts','lib/operations/queue.ts','lib/operations/trace.ts',
'deploy/runbooks/DEPLOYMENT.md','deploy/runbooks/ROLLBACK.md','deploy/runbooks/BACKUP_RESTORE.md'
];
let failed=false; for(const f of required){const ok=fs.existsSync(path.join(process.cwd(),f)); console.log(`${ok?'PASS':'FAIL'} ${f}`); if(!ok) failed=true;}
const session=fs.readFileSync('lib/session.ts','utf8'); if(session.includes('session-user')||session.includes('user@unicuro.com')){console.log('FAIL insecure session fallbacks');failed=true}else console.log('PASS no insecure session fallbacks');
const schema=fs.readFileSync('prisma/schema.prisma','utf8'); for(const m of ['DomainEvent','OperationTrace','IdempotencyRecord','WorkerExecution']){const ok=schema.includes(`model ${m}`);console.log(`${ok?'PASS':'FAIL'} Prisma model ${m}`);if(!ok)failed=true}
process.exit(failed?1:0);
