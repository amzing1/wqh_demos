export function createChatMessage(user) {
    const {name, profile, sentence} = user;
    const documentFrag = document.createElement('div');
    documentFrag.className = 'item';
    const profileDiv = document.createElement('div');
    profileDiv.className = 'profile';
    profileDiv.style.backgroundImage = `url(${profile})`;
    const nameDiv = document.createElement('span');
    nameDiv.className = 'name';
    nameDiv.innerHTML = name;
    const sentenceDiv = document.createElement('span');
    sentenceDiv.className = 'sentence';
    sentenceDiv.innerHTML = sentence;
    documentFrag.appendChild(profileDiv);
    documentFrag.appendChild(nameDiv);
    documentFrag.appendChild(sentenceDiv);
    return documentFrag;
}
