// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./front/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor(string memory _name, string memory _symbol) ERC721(_name,_symbol){
    }

    mapping(uint256 tokenId => string) _tokenURIs;
    uint256 totalSupply = 0;

    function minting(string memory tokenURI) public{
        _tokenURIs[totalSupply] = tokenURI;
        _mint(msg.sender, totalSupply);
        totalSupply +=1;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory){
        // return "QmTN9Qi9vEKpUq9C2khoSj2H1DJNYTJyYBypWERyxm2tmb";
        return _tokenURIs[_tokenId];
    }

    function _baseURI() internal view override returns(string memory){
        return "https://amethyst-defeated-badger-139.mypinata.cloud/ipfs/";
    }

    function getAllTokenURIs () public view returns(string[] memory){

        // _tokenURIs 의 모든 해쉬값을 담을 배열.
        string[] memory totalURIsArr = new string[](totalSupply);

        for (uint256 index = 0; index < totalSupply; index++) {
            totalURIsArr[index] = _tokenURIs[index];
        }
        return totalURIsArr;
    }

    // 현재 totalSupply 값 반환.
    function getTotalSupply () public view returns(uint256){

        return totalSupply;
    }

    struct MyNftInfo{
        string hashStr;
        uint256 tokenId;
    }
    // 내가 민팅한 NFT toekn ID 가져오기
    function getMyNftTokenId () public view returns (MyNftInfo[] memory){
        uint256[] memory myNftTokenIds = new uint256[](totalSupply);
        uint256 cnt = 0;

        for (uint256 index = 0; index < totalSupply; index++) {
            // 소유자가 본인인지 확인
            if(_ownerOf(index) == msg.sender){
                //myNftTokenIds[index] 토큰 ID가 담김
                if(index==0) {
                    myNftTokenIds[index] = 999;
                }
                else{

                    myNftTokenIds[index] = index;
                }
                cnt++;
            }
        }
        MyNftInfo[] memory myNftURIsArr = new MyNftInfo[](totalSupply);

        for (uint256 index = 0; index < totalSupply; index++) {

            if(myNftTokenIds[index] !=0){
                if(myNftTokenIds[index] == 999 ){

                    myNftURIsArr[index] = MyNftInfo({ 
                    hashStr : _tokenURIs[0],
                    tokenId : 0}) ;
                }

                // [0,1,0,3,0,5]
                else {
                    myNftURIsArr[index] = MyNftInfo({ 
                    hashStr : _tokenURIs[myNftTokenIds[index]],
                    tokenId : myNftTokenIds[index]}) ;
                }
                
            }
        }
        return (myNftURIsArr);
    }
    // 판매등록된 토큰의 가격 매핑 객체
    mapping(uint256 tokenId => uint256) _tokenPrices;

    // 빈배열 을 하나 만들어서 토큰아이디 저장
    uint256[] sellingTokenIds;
    uint256 salecnt = 0;
    

    // 판매 등록을 눌렀을 때 _tokenPrices 에 토큰ID에 가격 넣고, 판매중인 토큰아이디 배열에 토큰아이디 저장
    // 
    function NftsaleSumbit(uint256 tokenId, uint256 price) public returns(uint256[] memory){
        _tokenPrices[tokenId] = price;  
        sellingTokenIds.push(tokenId);
        // 현재 판매등록된 수량 1개 증가
        salecnt ++;
    }


    //판매 등록된 토큰ID가 어떤건지 확인하여 반환
    function getSaleTokenId() public view returns(uint256[] memory){
        
        uint256[] memory sumbitTokenIds = new uint256[](salecnt);

        for (uint256 index = 0; index < salecnt; index++) {
           
            sumbitTokenIds[index] = sellingTokenIds[index];
        }
        return sumbitTokenIds;

    }

    // 판매중인 NFT 의 판매가격 가져오기
    function getPrice() public view returns(uint256[] memory, uint256[] memory){

        uint256[] memory sumbitTokenIds = new uint256[](salecnt);

        for (uint256 index = 0; index < salecnt; index++) {
           
            sumbitTokenIds[index] = sellingTokenIds[index];
        }
        // return sumbitTokenIds;

        uint256[] memory sellingPrices = new uint256[](salecnt);

        for (uint256 index = 0; index < salecnt; index++) {
            sellingPrices[index] = _tokenPrices[sellingTokenIds[index]];
        }
        return (sellingPrices,sumbitTokenIds);
    }



    // NFT에 관련된 메서드는 여기에
    // NFT의 판매 권한을 줄 함수를 여기에 작성을 해서

    function setAppAll(address owner, address operator, bool approved) public {
        _setApprovalForAll(owner, operator, approved);
    }
}