#!/bin/bash
/usr/local/bin/nginx_monitor.sh &
nginx -g 'daemon off;'