type CryptoProps = {
  id: number;
  name: string;
  imgUrl: string;
};

export const CRYPTOS: CryptoProps[] = [
  {
    id: 1,
    name: "Solana",
    imgUrl:
      "https://raw.githubusercontent.com/github/explore/refs/heads/main/topics/solana/solana.png",
  },
  {
    id: 2,
    name: "Ethereum",
    imgUrl:
      "https://imageresizer.xnftdata.com/anim=false,fit=contain,width=400,height=400,quality=85/https://s3.amazonaws.com/app-assets.xnfts.dev/images/token-replacement-ethereum.png",
  },
  {
    id: 3,
    name: "Bitcoin",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png",
  },
];
