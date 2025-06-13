FROM node:18-bookworm

ENV TZ=Asia/Tokyo
ENV APP_ROOT=/nextjs
WORKDIR $APP_ROOT

# 必要パッケージのインストール
RUN apt-get update -qq && apt-get install -y \
  curl \
  git \
  openssh-client \
  keychain \
  bash-completion \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Task Runnerのインストール
RUN curl -sL "https://github.com/go-task/task/releases/download/v3.9.0/task_linux_amd64.deb" -o task.deb \
  && dpkg -i task.deb \
  && rm task.deb

# bashカスタマイズ（ホスト側に .bashrc がある想定）
COPY ../.bashrc /root/.bashrc

# デフォルトコマンド（シェル起動）
CMD [ "bash" ]
