// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FlashNFT {

  function findToken(address _addr, uint256 _start, uint256 _end) public view returns (uint256[] memory) {
    require(_end > _start, "findToken: end < start");
    ERC721Enumerable token = ERC721Enumerable(_addr);
    uint256[] memory ids;
    ids = new uint256[](_end - _start);
    uint256 index = 0;
    for (uint256 i = _start; i < _end; i++) {
      try token.ownerOf(i) returns (address owner) {
        // do nothing
      } catch {
        ids[index] = i;
        index++;
      }
    }
    return ids;
  }

}
