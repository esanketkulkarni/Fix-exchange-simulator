#!/usr/bin/env bash
set -euo pipefail

# --- Vars you can tweak ---
APP_DIR="/opt/fixsim"
SERVICE_NAME="fixsim"
USER_NAME="${USER:-ubuntu}"   # change if needed

sudo apt-get update -y
sudo apt-get install -y git python3 python3-venv

# Create app dir
sudo mkdir -p "$APP_DIR"
sudo chown "$USER_NAME":"$USER_NAME" "$APP_DIR"

# Create systemd unit
sudo tee /etc/systemd/system/${SERVICE_NAME}.service >/dev/null <<'EOF'
[Unit]
Description=FIX Exchange Simulator (AI Assist)
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/fixsim/app
Environment=LOG_LEVEL=info
ExecStart=/opt/fixsim/app/.venv/bin/python app/main.py --venue=NYSE
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

# If your linux user is not 'ubuntu', update it:
sudo sed -i "s/User=ubuntu/User=${USER_NAME}/" /etc/systemd/system/${SERVICE_NAME}.service

sudo systemctl daemon-reload
sudo systemctl enable ${SERVICE_NAME}
echo "Bootstrap done. Next: run GitHub Action to deploy code, then: sudo systemctl restart ${SERVICE_NAME}"

