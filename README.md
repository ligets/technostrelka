Запуск docker-compose.dev.yaml 
```shell
    docker-compose -f docker-compose.dev.yaml up --build -d
```

---
Запуск docker-compose.yaml для production
```shell
    docker-compose up --build -d
```

---

# ПРИ ЗАПУСКЕ НАДО СДЕЛАТЬ СИДДЭР НА СОЗДАНИЕ 2 ПОЛЬЗОВАТЕЛЕЙ И 1 АДМИНА ИЛИ СДЕЛАТЬ dump.sql 

Ссылка на figma [КЛИКАБЕЛЬНО!!!](https://www.figma.com/design/9fhhrJkNBst6rEiaaPSbkm/Technostrelka?node-id=1-2&t=FKHjwP4Ir8WqFCho-1)


```shell
sudo apt install git
sudo mkdir /technostrelka
sudo git clone http://github.com/ligets/technostrelka /technostrelka
cd /technostrelka
sudo chmod +x ./run.sh
sudo ./run.sh
sudo docker compose up --build -d
```