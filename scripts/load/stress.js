import http from "k6/http";
import { check } from "k6";
export const options = { stages: [{ duration: "1m", target: 50 }, { duration: "2m", target: 200 }, { duration: "1m", target: 0 }], thresholds: { http_req_failed: ["rate<0.02"], http_req_duration: ["p(95)<1000"] } };
export default function () {
  const res = http.get(`${__ENV.BASE_URL || "http://localhost:3000"}/api/health/live`);
  check(res, { "status is 200": (r) => r.status === 200 });
}
