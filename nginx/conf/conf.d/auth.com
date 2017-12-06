geo $accessvar {
    default 0;
    include access_control/static.conf;
    include access_control/dynamic.conf;
}

server {
    listen 80;
    server_name auth.yourdomain.com;
    location / {
	proxy_set_header        X-Real-IP       $remote_addr;
	proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_pass http://nodejs:3000;
    }
}

