# Dockerfile based on https://docs.docker.com/engine/examples/running_ssh_service/
FROM ubuntu:latest

RUN apt-get update && apt-get install -y openssh-server

# Configure SSH
RUN mkdir /var/run/sshd
# RUN echo 'root:THEPASSWORDYOUCREATED' | chpasswd
# RUN sed -i 's/#*PermitRootLogin prohibit-password/PermitRootLogin yes/g' /etc/ssh/sshd_config
RUN mkdir -p ~/.ssh
RUN echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDB4duhO1QmweQXzfE6FT8dpJeCa5Jv8Je/Sp72+GwwOAMVPwXQUvbcqQmOfpXRJqBMl0SBUsAbd5J/3nWmM6OMzbVMd1kpVYjUClPTtNgelY9xJn154EjyAp+wzoY+WrDRJAA1oFKFr46CWxGUNIm08Aa33jArQMt2bSRJudwUCkq3Y4x/RW6+xn9A7hYcBZtdeyXOkj0/4WBUGCebDsd6VDa/Lchs31J6z2LDaqJ+9nj8KQorolSKpIC6OxYYAoCftckeeiCUezqXXJPgIRsC9oFHUYecBCmUL9enMEYXSWzN2/Qe0El01f0tmrVpu/Jxat5D7HM5Hn0TeO5SyO0rmz0pJF8WbsnS/Q0abnEgGcu3uvQr2V0tkAkWGQGcShkAP/uWsdYmm/TnTQAf6GXoCftjk+q4kkJEW4GmQx2EJEDXuuLP8i2ZZ1IOtAwchqFLJsWDnEJvnUMhQdMKihbfOrzbEi8sZHrHCrANHVkJ0SUrFk3HJkDNfA7dSGr4Dx/mduFwsteei56H/2Iao3DYzP9vEtnRI+7WfeSCPOrGjvaDEEhWgNb2tEzIvj28KR1/hIkve+LGGkfvDPqyUmjMYjvmFxfOh2ZJukvyxJPzQwOfyIBPAiZsPeZ4G7FeRbdFmevxnkOUg4gK9e1zyabjbIVHuW4uolK6n5KfhZ6/qQ== team@artandcode.studio\n' >>  ~/.ssh/authorized_keys

# SSH login fix. Otherwise user is kicked off after login
RUN sed -i 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

# Install nodejs via nvm: https://github.com/nvm-sh/nvm
RUN apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# Load nvm
RUN export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
RUN [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
RUN nvm install 14

RUN npm install yarn@berry -g

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 22
# EXPOSE 8080

# CMD ["yarn","run", "build"]
# CMD ["yarn","run", "start"]