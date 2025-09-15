document.addEventListener("DOMContentLoaded",()=>{
 const form= document.querySelector("#note-form");
 const notesContainer = document.querySelector("#notes-list");

 //load notes from the local storage
 function loadNotes(){
    return JSON.parse(localStorage.getItem("notes"))||[];
 }

 //save to local storage
 function saveNotes(notes){
    localStorage.setItem("notes",JSON.stringify(notes));
 }
 //to show notes in html
 function showNotes(){
    const notes =loadNotes();
    notesContainer.innerHTML="<h2>Saved Notes</h2>";

    if(notes.length===0){
        notesContainer.innerHTML="<p> No notes crreated yet! Please create a note✨ </p>";
        return;
    }
    notes.forEach(note=>{
        const noteDiv =document.createElement("div");
        noteDiv.classList.add("note");

        const titleEl =document.createElement("div"); //title
        titleEl.classList.add("note-title");
        titleEl.textContent =note.title;

        //content
        const contentEl=document.createElement("div");
        contentEl.classList.add("note-content");
        contentEl.textContent =note.content;

        noteDiv.appendChild(titleEl);
        noteDiv.appendChild(contentEl);
        notesContainer.appendChild(noteDiv);
    });
 }

 //form submission handling
  form.addEventListener("submit",(e) => {
    e.preventDefault();//page reload prevention

    const title =document.querySelector("#title").value.trim();
    const content =document.querySelector("#content").value.trim();

    if (!title||!content) return;

    const notes=loadNotes();
    notes.push({ title, content });
    saveNotes(notes);

    form.reset(); //clear i/p
    showNotes();  //refresh
  });

  showNotes();
});