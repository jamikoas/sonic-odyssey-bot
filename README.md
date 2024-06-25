# sonic-odyssey-bot
sonic odyssey bot tx daily Generate 130 New Address dan Send Token to Address

## Install Node Js (Jika Belon)

```
sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update && sudo apt-get install nodejs -y
```

## Clone Repository
```
git clone https://github.com/jamikoas/sonic-odyssey-bot
cd sonic-odyssey-bot
```
```
npm install
```

## Edit Private Key json
```
nano privateKeys.json
```

Ganti Dengan Private Key Wallet Solana Kalian Save CTRL X Y Enter

## Jalankan
```
npm start
```

