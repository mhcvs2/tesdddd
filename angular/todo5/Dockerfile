FROM registry.bst-1.cns.bstjpc.com:5000/teamrock/apache2:production

COPY apache2 /apache2
COPY todo4 /app

RUN a2enmod proxy proxy_ajp proxy_http rewrite deflate headers proxy_balancer proxy_connect proxy_html xml2enc \
&& chmod +x /apache2/run.sh

ENTRYPOINT cd /apache2 && ./run.sh

