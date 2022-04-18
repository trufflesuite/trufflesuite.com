const boxes = {
    container: Array.from(document.querySelectorAll('#boxes [data-type="boxes.container"]')),
    params: null,
    init: () => {
        boxes.bind();
        boxes.queryString();
    },
    bind: () => {
        const input = document.getElementById('boxes.filter.input');

        input.addEventListener('keyup', (e) => {
            // if (e.key === 'Enter') {
            //     const filter = document.querySelector('input[name="boxes.filter.radio"]:checked').value;
            //     const term = e.target.value;

            //     boxes.search(filter, term);
            // }        

            if (e.key === 'Backspace' || e.key === 'Delete') {
                if (e.target.value.length === 0) {
                    boxes.clear();
                }
            } else {
                const filter = document.querySelector('input[name="boxes.filter.radio"]:checked').value;
                const term = e.target.value;
    
                boxes.search(filter, term);      
            }

            e.preventDefault();    
        });

        input.focus();
    },
    queryString: () => {
        boxes.params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        const filter = boxes.params.filter;
        const term = boxes.params.term;

        if ((filter == "tags" || filter == "name") && term !== '') {
            document.getElementById('boxes.filter.input').value = term;
            document.querySelector(`input[name="boxes.filter.radio"][value="${filter}"]`).checked = true;

            boxes.search(filter, term);
        } else {
            document.getElementById('boxes').style.visibility = 'visible';
        }

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
        
        document.getElementById('boxes').style.visibility = 'visible';
    },
    clear: () => {
        boxes.container.forEach((item) => {
            item.style.display = 'block';        
        }); 
    }    
}