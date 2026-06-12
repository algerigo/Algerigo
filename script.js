const form = document.querySelector('.contact-form');
const note = document.querySelector('.form-note');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const project = data.get('project') || 'votre projet';
  const button = form.querySelector('button[type="submit"]');

  note.textContent = 'Envoi de votre demande...';
  button.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Formspree request failed');
    }

    note.textContent = `Merci, votre demande pour "${project}" a bien été envoyée. L'équipe AlgeriGo vous recontactera rapidement.`;
    form.reset();
  } catch {
    note.textContent = "L'envoi n'a pas abouti. Vérifiez votre connexion ou réessayez dans quelques instants.";
  } finally {
    button.disabled = false;
  }
});
