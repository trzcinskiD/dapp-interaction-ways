pragma solidity ^0.6.0;

contract newsInbox {
    struct Message {
        address payable sender;
        string content;
    }
    Message[] public messages;


    function addMessage(string memory content) public {
        Message memory newMessage = Message({
            sender: msg.sender,
            content: content
        });
        messages.push(newMessage);
    }

    function getMessagesCount() public view returns(uint) {
        return messages.length;
    }
}