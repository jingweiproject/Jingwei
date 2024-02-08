# 精卫

作者：@ezsyncxz

这是一个开拓思路的Demo项目，目的是想释放蓝筹NFT的流动性，不是新协议，而是作为区中心化的基础设施。

Jingwei合约提供了三种方法：createJFT,lockNFT,releaseNFT。

通过createJFT创建NFT->FT的代币，通过lockNFT锁定NFT获得JFT，JFT是完全兼容Erc20协议，可以作为代币正常流通，通过releaseNFT销毁JFT获得NFT。

通过事件和graph可以做成完全去中心化的产品，大致思路是网页上显示对应的仓库，仓库里锁定所有用户锁定的NFT，用户可以选择自己想要解锁的NFT，通过销毁指定数量的JFT解锁该NFT。

以上只是我的个人想法，更多好玩的思路由大家去发掘。

部署前请自行添加.evn文件。

Jingwei:https://bscscan.com/address/0x81Ec6E444148b2c562f37FE52b155bC29Fd9b878#code
JingweiFungibleToken:https://bscscan.com/address/0xFF7A49E94EEd587e15980dbFCf6587106630cBfB#code
graph:https://thegraph.com/hosted-service/subgraph/jingweiproject/jingwei

免责声明：改代码未经审核，本人不是solidity编码为主要工作，仅作为兴趣写的，因此无法保证代码安全，使用前请自行辨别，代码随意使用。