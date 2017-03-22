FROM phusion/baseimage

CMD ["/sbin/my_init"]
ENV DEBIAN_FRONTEND noninteractive

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update -y && \
    apt-get install -y \    
    gcc \
    make \
    ruby-full \
    zlib1g-dev

RUN gem install bundler

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.10.0

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# RUN curl -o- -L https://yarnpkg.com/install.sh | bash
# RUN export PATH="$HOME/.yarn/bin:$PATH"
RUN npm install -g yarn

WORKDIR /var/www

ENV DEBIAN_FRONTEND teletype

EXPOSE 3000 3001
