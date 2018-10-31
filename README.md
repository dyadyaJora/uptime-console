# Запуск

## Подготовка

    npm install
    
Отредактировать порт\хост\название базы в `config/config.local.js` или  `config/config.prod.js` 

## Создание тестовой базы 

Осторожно, команда полностью перезатирает существующую базу, указанную в конфиге

    node insert-test-data
    
## Последовательный запуск узлов (TODO вытащит в npm скрипты)

    node chain\chain1_up-quant.js

    forever start --spinSleepTime 10000 -o out2.log -e err2.log chain\chain2_create-ping-queue
    
    forever start --spinSleepTime 10000 -o out3.log -e err3.log chain\chain3_do-ping
    
    forever start --spinSleepTime 10000 -o out3.log -e err3.log chain\chain3_respnce-query
    
