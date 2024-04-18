document.addEventListener('DOMContentLoaded', function() {
    function submitVote(party) {
      const allVoteButtons = document.querySelectorAll('button');
      allVoteButtons.forEach(button => {
        button.style.display = 'none';
      });
  
      const allPartySymbols = document.querySelectorAll('.party-symbol');
      allPartySymbols.forEach(symbol => {
        const partyName = symbol.parentElement.parentElement.children[0].innerText.trim();
        if (partyName !== party) {
          symbol.style.display = 'none';
        }
      });
  
      const voteMessage = document.getElementById('vote-message');
      voteMessage.style.display = 'block';
    }
  });
  