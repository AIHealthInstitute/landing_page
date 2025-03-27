// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"


document.addEventListener('DOMContentLoaded', function() {
    
    const benchmarksNav = document.getElementById('benchmarks-nav');
    
    const methodologyNav = document.getElementById('methodology-nav');
    const datasetsNav = document.getElementById('datasets-nav');
    
    const benchmarksPage = document.getElementById('benchmarks-page');
    const methodologyPage = document.getElementById('methodology-page');
    const datasetsPage = document.getElementById('datasets-page');
    
    const medqaButton = document.getElementById('medqa-button');
    const medmcqaButton = document.getElementById('medmcqa-button');
    const clinicalNotesButton = document.getElementById('clinical-notes-button');
    const diagnosisButton = document.getElementById('diagnosis-button');
    const bedsideMannerButton = document.getElementById('bedside-manner-button');
    
    const medqaData = document.getElementById('medqa-data');
    const medmcqaData = document.getElementById('medmcqa-data');
    const comingSoonMessage = document.getElementById('coming-soon-message');
    
    function clearActiveNavs() {
        benchmarksNav.classList.remove('active');
        methodologyNav.classList.remove('active');
        datasetsNav.classList.remove('active');
    }
    
    function hideAllPages() {
        benchmarksPage.classList.remove('active-page');
        methodologyPage.classList.remove('active-page');
        datasetsPage.classList.remove('active-page');
        
        benchmarksPage.style.display = 'none';
        methodologyPage.style.display = 'none';
        datasetsPage.style.display = 'none';
    }
    
    function clearActiveDatasetButtons() {
        medqaButton.classList.remove('active');
        medmcqaButton.classList.remove('active');
        clinicalNotesButton.classList.remove('active');
        diagnosisButton.classList.remove('active');
        bedsideMannerButton.classList.remove('active');
    }
    
    function hideAllTables() {
        medqaData.style.display = 'none';
        medmcqaData.style.display = 'none';
        comingSoonMessage.style.display = 'none';
    }
    
    benchmarksNav.addEventListener('click', function(e) {
        e.preventDefault();
        clearActiveNavs();
        hideAllPages();
        benchmarksNav.classList.add('active');
        benchmarksPage.classList.add('active-page');
        benchmarksPage.style.display = 'block';
        
        clearActiveDatasetButtons();
        hideAllTables();
        medqaButton.classList.add('active');
        medqaData.style.display = 'table';
        
        document.getElementById('dataset-title').textContent = 'MedQA Performance Evaluation';
    });
    
    methodologyNav.addEventListener('click', function(e) {
        e.preventDefault();
        clearActiveNavs();
        hideAllPages();
        methodologyNav.classList.add('active');
        methodologyPage.classList.add('active-page');
        methodologyPage.style.display = 'block';
    });
    
    datasetsNav.addEventListener('click', function(e) {
        e.preventDefault();
        clearActiveNavs();
        hideAllPages();
        datasetsNav.classList.add('active');
        datasetsPage.classList.add('active-page');
        datasetsPage.style.display = 'block';
    });
    
    
    medqaButton.addEventListener('click', function() {
      clearActiveDatasetButtons();
      hideAllTables();
      medqaButton.classList.add('active');
      medqaData.style.display = 'table';
      document.getElementById('dataset-title').textContent = 'MedQA Performance Evaluation';
      
      document.getElementById('medqa-insights').style.display = 'block';
      document.getElementById('medmcqa-insights').style.display = 'none';
  });
    
    medmcqaButton.addEventListener('click', function() {
      clearActiveDatasetButtons();
      hideAllTables();
      medmcqaButton.classList.add('active');
      medmcqaData.style.display = 'table';
      document.getElementById('dataset-title').textContent = 'MedMCQA Performance Evaluation';
  });
    
  clinicalNotesButton.addEventListener('click', function() {
    clearActiveDatasetButtons();
    hideAllTables();
    clinicalNotesButton.classList.add('active');
    comingSoonMessage.style.display = 'flex';
    document.getElementById('dataset-title').textContent = 'Clinical Notes Performance Evaluation';
    
    document.getElementById('medqa-insights').style.display = 'none';
    document.getElementById('medmcqa-insights').style.display = 'none';
});
    
    diagnosisButton.addEventListener('click', function() {
        clearActiveDatasetButtons();
        hideAllTables();
        diagnosisButton.classList.add('active');
        comingSoonMessage.style.display = 'flex';
        document.getElementById('dataset-title').textContent = 'Diagnosis Performance Evaluation';
        document.getElementById('medqa-insights').style.display = 'none';
        document.getElementById('medmcqa-insights').style.display = 'none';
    });
    
    bedsideMannerButton.addEventListener('click', function() {
        clearActiveDatasetButtons();
        hideAllTables();
        bedsideMannerButton.classList.add('active');
        comingSoonMessage.style.display = 'flex';
        document.getElementById('dataset-title').textContent = 'Bedside Manner Performance Evaluation';
        document.getElementById('medqa-insights').style.display = 'none';
        document.getElementById('medmcqa-insights').style.display = 'none';
    });
    
    const tabs = document.querySelectorAll('.tab');

const sortButtons = document.querySelectorAll('.sort-button');
sortButtons.forEach(button => {
    button.addEventListener('click', function() {
        const column = this.getAttribute('data-column');
        
        const currentDirection = this.classList.contains('asc') ? 'asc' : 
                               (this.classList.contains('desc') ? 'desc' : 'none');
        
        sortButtons.forEach(btn => {
            btn.classList.remove('asc');
            btn.classList.remove('desc');
            btn.querySelector('.sort-icon').textContent = '◆';
        });
        
        let newDirection;
        if (currentDirection === 'desc') {
            newDirection = 'asc';
            this.classList.add('asc');
            this.querySelector('.sort-icon').textContent = '▲';
        } else {
            newDirection = 'desc';
            this.classList.add('desc');
            this.querySelector('.sort-icon').textContent = '▼';
        }
        
        let activeTable;
        if (medqaButton.classList.contains('active')) {
            activeTable = document.getElementById('medqa-data');
        } else if (medmcqaButton.classList.contains('active')) {
            activeTable = document.getElementById('medmcqa-data');
        } else {
            return;
        }
        
        const rows = Array.from(activeTable.querySelectorAll('tbody tr'));
        
        rows.sort((a, b) => {
            let valueA, valueB;
            
            if (column === 'accuracy') {
                valueA = parseFloat(a.querySelector('.accuracy').textContent);
                valueB = parseFloat(b.querySelector('.accuracy').textContent);
            } 
            else if (column === 'input-cost') {
                valueA = parseFloat(a.querySelectorAll('.cost')[0].textContent.replace('$', ''));
                valueB = parseFloat(b.querySelectorAll('.cost')[0].textContent.replace('$', ''));
            }
            else if (column === 'output-cost') {
                valueA = parseFloat(a.querySelectorAll('.cost')[1].textContent.replace('$', ''));
                valueB = parseFloat(b.querySelectorAll('.cost')[1].textContent.replace('$', ''));
            }
            
            if (newDirection === 'desc') {
                return valueB - valueA; 
            } else {
                return valueA - valueB;
            }
        });
        
        const tbody = activeTable.querySelector('tbody');
        rows.forEach(row => {
            tbody.appendChild(row);
        });
        
        rows.forEach((row, index) => {
            row.querySelector('.rank').textContent = index + 1;
        });
    });
});
    
    benchmarksNav.click();

    const modelData = {
  'OpenAI o3-mini': {
    provider: 'OpenAI',
    type: 'Proprietary',
    medqa_rank: 1,
    medqa_accuracy: '95.19%',
    medmcqa_rank: 4,
    medmcqa_accuracy: '85.64%'
  },
  'DeepSeek-R1': {
    provider: 'DeepSeek',
    type: 'Open Weight',
    medqa_rank: 2,
    medqa_accuracy: '91.91%',
    medmcqa_rank: 2,
    medmcqa_accuracy: '87.96%'
  },
  'Llama 3.3 70B Instruct': {
    provider: 'Meta',
    type: 'Open Weight',
    medqa_rank: 3,
    medqa_accuracy: '90.88%',
    medmcqa_rank: 1,
    medmcqa_accuracy: '91.83%'
  },
  'Claude 3.7 Sonnet': {
    provider: 'Anthropic',
    type: 'Proprietary',
    medqa_rank: 4,
    medqa_accuracy: '87.88%',
    medmcqa_rank: 3,
    medmcqa_accuracy: '86.15%'
  },
  'Gemini Flash 2.0': {
    provider: 'Google',
    type: 'Proprietary',
    medqa_rank: 5,
    medqa_accuracy: '82.7%',
    medmcqa_rank: 5,
    medmcqa_accuracy: '83.28%'
  },
  'Gemini 2.0 Flash Lite': {
    provider: 'Google',
    type: 'Proprietary',
    medqa_rank: 6,
    medqa_accuracy: '77.18%',
    medmcqa_rank: 6,
    medmcqa_accuracy: '79.63%'
  },
  'Mistral Large 2411': {
    provider: 'Mistral AI',
    type: 'Proprietary',
    medqa_rank: 7,
    medqa_accuracy: '74.23%',
    medmcqa_rank: 7,
    medmcqa_accuracy: '76.01%'
  },
  'OpenAI GPT-4o-mini': {
    provider: 'OpenAI',
    type: 'Proprietary',
    medqa_rank: 8,
    medqa_accuracy: '73.99%',
    medmcqa_rank: 8,
    medmcqa_accuracy: '75.22%'
  },
  'Mistral Small 3.1 24B': {
    provider: 'Mistral AI',
    type: 'Open Weight',
    medqa_rank: 9,
    medqa_accuracy: '68.77%',
    medmcqa_rank: 11,
    medmcqa_accuracy: '71.75%'
  },
  'Qwen2.5 32B Instruct': {
    provider: 'Alibaba',
    type: 'Open Weight',
    medqa_rank: 10,
    medqa_accuracy: '68.77%',
    medmcqa_rank: 9,
    medmcqa_accuracy: '73.11%'
  },
  'Gemma 3 27b': {
    provider: 'Google',
    type: 'Open Weight',
    medqa_rank: 11,
    medqa_accuracy: '67.44%',
    medmcqa_rank: 12,
    medmcqa_accuracy: '70.14%'
  },
  'Gemma 3 27B': {
    provider: 'Google',
    type: 'Open Weight',
    medqa_rank: 11,
    medqa_accuracy: '67.44%',
    medmcqa_rank: 12,
    medmcqa_accuracy: '70.14%'
  },
  'Llama 3.2 3B Instruct': {
    provider: 'Meta',
    type: 'Open Weight',
    medqa_rank: 12,
    medqa_accuracy: '67.29%',
    medmcqa_rank: 10,
    medmcqa_accuracy: '72.05%'
  },
  'Gemini Flash 1.5 8B': {
    provider: 'Google',
    type: 'Open Weight',
    medqa_rank: 13,
    medqa_accuracy: '59.59%',
    medmcqa_rank: 13,
    medmcqa_accuracy: '64.56%'
  }
};

const modelNames = document.querySelectorAll('.model-name');

modelNames.forEach(modelNameElement => {
  const modelNameText = modelNameElement.textContent.trim();
  const modelName = Object.keys(modelData).find(name => modelNameText.includes(name));
  
  if (modelName && modelData[modelName]) {
    const model = modelData[modelName];
    
    const existingBadges = modelNameElement.querySelectorAll('.param-badge');
    existingBadges.forEach(badge => badge.remove());
    
    const hoverCard = document.createElement('div');
    hoverCard.className = 'model-hover-card';
    
    let otherDataset = '';
    let currentDataset = '';
    
    if (modelNameElement.closest('#medqa-data')) {
      otherDataset = 'MedMCQA';
      currentDataset = 'MedQA';
    } else {
      otherDataset = 'MedQA';
      currentDataset = 'MedMCQA';
    }
    
    let otherRank = '';
    let otherAccuracy = '';
    
    if (otherDataset === 'MedMCQA') {
      otherRank = model.medmcqa_rank;
      otherAccuracy = model.medmcqa_accuracy;
    } else {
      otherRank = model.medqa_rank;
      otherAccuracy = model.medqa_accuracy;
    }
    

    const arrow = document.createElement('div');
    arrow.className = 'model-hover-arrow';
    hoverCard.appendChild(arrow);
    
    hoverCard.innerHTML += `
      <h4>${modelName}</h4>
      <p><strong>Provider:</strong> ${model.provider}</p>
      <p><strong>Type:</strong> ${model.type}</p>
      <div class="hover-stats">
        <div>
          <span>${currentDataset} Rank</span>
          <span class="stat-value">#${modelNameElement.closest('tr').querySelector('.rank').textContent}</span>
        </div>
        <div>
          <span>${otherDataset} Rank</span>
          <span class="stat-value">#${otherRank}</span>
        </div>
        <div>
          <span>${otherDataset} Accuracy</span>
          <span class="stat-value">${otherAccuracy}</span>
        </div>
      </div>
    `;
    
    const existingCards = modelNameElement.querySelectorAll('.model-hover-card');
    existingCards.forEach(card => card.remove());
    
    modelNameElement.appendChild(hoverCard);
    
modelNameElement.addEventListener('mouseenter', function() {

  const rect = modelNameElement.getBoundingClientRect();
  const tableRect = modelNameElement.closest('table').getBoundingClientRect();
  
  const isTopHalf = rect.top < (tableRect.top + tableRect.height/2);
  
  if (isTopHalf) {
    hoverCard.style.top = '100%';
    hoverCard.style.bottom = 'auto';

    arrow.style.top = '-8px';
    arrow.style.bottom = 'auto';
    arrow.style.borderTop = '0';
    arrow.style.borderBottom = '8px solid white';
  } else {

    hoverCard.style.bottom = '100%';
    hoverCard.style.top = 'auto';

    arrow.style.bottom = '-8px';
    arrow.style.top = 'auto';
    arrow.style.borderBottom = '0';
    arrow.style.borderTop = '8px solid white';
  }
  

  hoverCard.style.left = '50px';
  
  hoverCard.style.display = 'block';
});
    
    modelNameElement.addEventListener('mouseleave', function() {
      hoverCard.style.display = 'none';
    });
  }
});
});