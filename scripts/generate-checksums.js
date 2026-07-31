const fs=require('fs'),crypto=require('crypto'),path=require('path');
const targets=['package.json','package-lock.json','prisma/schema.prisma','Dockerfile','Dockerfile.worker','docker-compose.certification.yml'];
const lines=targets.filter(fs.existsSync).map(f=>`${crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')}  ${f}`);
fs.mkdirSync('release',{recursive:true}); fs.writeFileSync('release/SHA256SUMS',lines.join('\n')+'\n'); console.log(lines.join('\n'));
