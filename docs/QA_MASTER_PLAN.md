# QA Master Plan

## Test layers

- Unit tests
- Integration tests
- End-to-end tests
- Regression tests
- Smoke tests
- API tests
- PWA tests
- Security tests

## Release gate

A release candidate should not pass unless:
- smoke tests pass
- critical E2E journeys pass
- API tests pass
- no critical accessibility failures remain
- no critical security failures remain
- rollback plan exists
