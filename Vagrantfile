# -*- mode: ruby -*-
# vi: set ft=ruby :
 
# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"
 
num = rand(1000..9999)
 
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
 
  config.vm.network :private_network, ip: "175.16.150.15"
  config.vm.hostname = "vagrant.brightsky#{num}.vm"
  config.vm.box = "vagrant-nodejs-brightsky-ubuntu-14_04"
  config.vm.box_url = "https://s3-us-west-1.amazonaws.com/brightsky.co/nodejs.box"
 
end
