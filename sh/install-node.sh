#!/bin/bash

# Обновляем список пакетов
sudo apt update

# Устанавливаем необходимые зависимости
sudo apt install -y curl gnupg

# Добавляем официальный репозиторий Node.js
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash -

# Устанавливаем Node.js и npm
sudo apt install -y nodejs

# Проверяем установку Node.js и npm
node -v
npm -v
