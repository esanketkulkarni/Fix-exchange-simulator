#!/usr/bin/env bash
set -euo pipefail
SERVICE_NAME="${1:-fixsim}"

# We assume the repo lives in /opt/fixsim/app
cd /opt/fixsim/app

# Python venv
if [ ! -d ".venv" ]; then
  python3 -m venv .venv
fi
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Restart service
sudo systemctl restart "$SERVICE_NAME"

# Health check
echo "Waiting for API..."
sleep 2
curl -fsS http://127.0.0.1:8000/health || true
echo "Deployed and restarted: $SERVICE_NAME"

