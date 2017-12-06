#!/bin/bash
oldcksum=`cksum /etc/nginx/access_control/dynamic.conf`
inotifywait -e modify,move,create,delete -mr --timefmt '%d/%m/%y %H:%M' --format '%T' \
/etc/nginx/access_control/dynamic.conf | while read date time; do
    newcksum=`cksum /etc/nginx/access_control/dynamic.conf`
    if [ "$newcksum" != "$oldcksum" ]; then
        echo "At ${time} on ${date}, config file update detected." >> /var/log/nginx/nginx_autoreload.log
	oldcksum=$newcksum
        nginx -s reload
    fi
done