FROM ubuntu:latest

# Set debconf to run non-interactively
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Install base dependencies
RUN apt-get update && apt-get install -y \
    openssh-server \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    git \
    libssl-dev \
    wget \
    iproute2

# Configure SSH
# https://docs.docker.com/engine/examples/running_ssh_service/
RUN mkdir /var/run/sshd
ENV ROOT_PASSWD "mono4-purple-lucre0-process-fetal-swapping"
RUN echo 'root:'$ROOT_PASSWD | chpasswd
RUN sed -i 's/#*PermitRootLogin prohibit-password/PermitRootLogin yes/g' /etc/ssh/sshd_config
RUN mkdir -p ~/.ssh
RUN echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDB4duhO1QmweQXzfE6FT8dpJeCa5Jv8Je/Sp72+GwwOAMVPwXQUvbcqQmOfpXRJqBMl0SBUsAbd5J/3nWmM6OMzbVMd1kpVYjUClPTtNgelY9xJn154EjyAp+wzoY+WrDRJAA1oFKFr46CWxGUNIm08Aa33jArQMt2bSRJudwUCkq3Y4x/RW6+xn9A7hYcBZtdeyXOkj0/4WBUGCebDsd6VDa/Lchs31J6z2LDaqJ+9nj8KQorolSKpIC6OxYYAoCftckeeiCUezqXXJPgIRsC9oFHUYecBCmUL9enMEYXSWzN2/Qe0El01f0tmrVpu/Jxat5D7HM5Hn0TeO5SyO0rmz0pJF8WbsnS/Q0abnEgGcu3uvQr2V0tkAkWGQGcShkAP/uWsdYmm/TnTQAf6GXoCftjk+q4kkJEW4GmQx2EJEDXuuLP8i2ZZ1IOtAwchqFLJsWDnEJvnUMhQdMKihbfOrzbEi8sZHrHCrANHVkJ0SUrFk3HJkDNfA7dSGr4Dx/mduFwsteei56H/2Iao3DYzP9vEtnRI+7WfeSCPOrGjvaDEEhWgNb2tEzIvj28KR1/hIkve+LGGkfvDPqyUmjMYjvmFxfOh2ZJukvyxJPzQwOfyIBPAiZsPeZ4G7FeRbdFmevxnkOUg4gK9e1zyabjbIVHuW4uolK6n5KfhZ6/qQ== team@artandcode.studio\n' >>  ~/.ssh/authorized_keys

# SSH login fix. Otherwise user is kicked off after login
RUN sed -i 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile
# Find the port with `nmap -sV -p- <host>`
EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]

# Install node.js
RUN curl -sL https://deb.nodesource.com/setup_current.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/src/app
RUN npm install yarn@berry -g
COPY . .
ENV YARN_CHECKSUM_BEHAVIOR update
RUN yarn install


# EXPOSE 8080

# CMD ["yarn","run", "build"]
# CMD ["yarn","run", "start"]