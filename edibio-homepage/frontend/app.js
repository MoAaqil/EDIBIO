document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      // Simple toggle action
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#ffffff';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid #E2E8F0';
      }
    });
  }

  // Interactive Stock Sync Simulator
  const buyBtn = document.getElementById('simulate-buy-btn');
  const posStock = document.getElementById('pos-stock-qty');
  const particle = document.getElementById('sync-particle');
  const logBox = document.getElementById('simulation-toast');
  
  let currentStock = 50;
  let isAnimating = false;

  if (buyBtn && posStock && particle && logBox) {
    buyBtn.addEventListener('click', () => {
      if (isAnimating) return;
      if (currentStock <= 0) {
        logBox.innerText = 'Out of stock! Restarting simulator...';
        currentStock = 50;
        posStock.innerText = `${currentStock} pcs`;
        return;
      }

      isAnimating = true;
      buyBtn.disabled = true;
      buyBtn.innerText = 'Processing...';
      
      // Update Log
      logBox.innerText = 'Sale recorded on EdiStore! Dispatching sync signal...';
      logBox.className = 'toast-log';

      // Trigger flow particle animation
      particle.classList.add('animating');

      // Sync event listener after particle reaches POS terminal (1.2 seconds)
      setTimeout(() => {
        currentStock -= 1;
        posStock.innerText = `${currentStock} pcs`;
        
        // Flash success status
        posStock.style.color = '#10b981';
        posStock.style.transform = 'scale(1.2)';
        
        logBox.innerText = `Inventory Synced! POS Stock decremented to ${currentStock}. Invoice generated automatically!`;
        logBox.className = 'toast-log success';
        
        setTimeout(() => {
          posStock.style.color = '';
          posStock.style.transform = '';
        }, 600);

      }, 1200);

      // Clean up animation classes
      setTimeout(() => {
        particle.classList.remove('animating');
        buyBtn.disabled = false;
        buyBtn.innerText = 'Buy 1 Item';
        isAnimating = false;
      }, 1800);
    });
  }
});
