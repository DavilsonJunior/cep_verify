  (function(doc) {
    'use strict';

    const $formCEP = doc.querySelector('[data-js="form-cep"]');
    const $inputCEP = doc.querySelector('[data-js="input-cep"]');
    const xhr = new XMLHttpRequest();
    $formCEP.addEventListener('submit', handleSubmitFormCEP, false);

    const content = doc.querySelector('[data-js="cep-info"]');
    const loading = doc.querySelector('[data-js="status"]');

    loading.style.display = 'none';
    content.style.display = 'none';
    
    function handleSubmitFormCEP(e) {
      e.preventDefault();

      loading.style.display = 'block';
      content.style.display = 'none';

      const cep = $inputCEP.value.replace(/\D/g, '');

      setTimeout(() => {
        const url = `https://viacep.com.br/ws/${cep}/json/`
        xhr.open('GET', url);        
        xhr.send();
        xhr.addEventListener('readystatechange', handleReadyStateChange);
      }, 2000);      
    }

    function handleReadyStateChange() {
      if ( xhr.readyState === 4 && xhr.status === 200) {
        content.style.display = 'block';
        loading.style.display = 'none';
        fillCEPFields(xhr);
      } 
                   
    }

    function fillCEPFields(xhr) {
      const data = JSON.parse(xhr.responseText);

      if (data.erro || xhr.status === 400) {
        loading.innerHTML = 'Nenhum CEP foi encontrado, com esse numero!';
        return;
      }

      const $logradouro = doc.querySelector('[data-js="logradouro"]');
      const $bairro = doc.querySelector('[data-js="bairro"]');
      const $estado = doc.querySelector('[data-js="estado"]');
      const $cidade = doc.querySelector('[data-js="cidade"]');
      const $cep = doc.querySelector('[data-js="cep"]');

      $logradouro.innerHTML = ' '+data.logradouro;
      $bairro.innerHTML = ' '+data.bairro;
      $estado.innerHTML = ' '+data.uf;
      $cidade.innerHTML = ' '+data.localidade;
      $cep.innerHTML = ' '+data.cep;
    }
})(document);