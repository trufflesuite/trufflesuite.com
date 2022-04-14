const boxes = {
    container: Array.from(document.querySelectorAll('#boxes [data-type="boxes.container"]')),
    init: () => {
        const input = document.getElementById('boxes.filter.input');

        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const filter = document.querySelector('input[name="boxes.filter.radio"]:checked').value;
                const term = e.target.value;

                boxes.search(filter, term);
            }

            if (e.key === 'Backspace' || e.key === 'Delete') {
                if (e.target.value.length === 0) {
                    boxes.clear();
                }
            }

            e.preventDefault();    
        });

        input.focus();
    },
    search: (filter, term) => {
        switch (filter) {
            case "name":
                boxes.container.forEach((item) => {
                    if (item.id.toString().includes(term))
                        item.style.display = 'block';
                    else
                        item.style.display = 'none';        
                });
                break;
            case "tags":
                boxes.container.forEach((item) => {
                    if (JSON.parse(item.dataset.tags.replace(/'/g, '"')).filter(s => s.includes(term)).length > 0)
                        item.style.display = 'block';
                    else
                        item.style.display = 'none';        
                });
                break;
        }        
    },
    clear: () => {
        boxes.container.forEach((item) => {
            item.style.display = 'block';        
        }); 
    }
}