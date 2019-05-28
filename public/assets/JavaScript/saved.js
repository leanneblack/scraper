$(document).ready(function() {
  var articleContainer = $(".article-container");

  $(document).on("click", ".btn.delete", handleArticleDelete);
  $(document).on("click", ".btn.notes", handleArticleNotes);
  $(document).on("click", ".btn.save", handleNoteSave);
  $(document).on("click", "btn.note-delete", handleNoteDelete);

  initpage();

  function initpage() {
    articleContainer.empty();
    $.get("api/headlines?saved=true").then(function(data) {
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }
  function renderArticles(articles) {
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }
  function createPanel(article) {
    var panel = $(
      [
        "div class = 'panel panel-default'>",
        "<div class = 'panel-heading'>",
        "<h3>",
        article.headlline,
        "<a class = 'btn btn-danger delete'>",
        "Delete your saved articles",
        "</a>",
        "<a class = 'btn btn-info notes'>Your Saved articles Notes</a>",
        "</h3>",
        "</div>",
        "</div>"
      ].join("")
    );

    panel.data("_id", article._id);
    return panel;
  }

  function renderNotesList(data) {
    var notesToRender = [];
    var currentNote;
    if (!data.notes.length) {
      currentNote = [
        "<li class= 'list-group-item'>",
        "No notes for this article yet!",
        "</li>"
      ].join("");
      notesToRender.push(currentNote);
    } else {
      for (var i = 0; i < data.notes.length; i++) {
        currentNote = $(
          [
            "<li class= 'list-group-item note'>",
            data.notes[i].noteText,
            "<button class = 'btn btn-danger note delete'>x</button>",
            "</li>"
          ].join("")
        );

        currentNote.children("button").data("_id", data.notes[i]._id);
        notesToRender.push(currentNote);
      }
    }
    $(".note-container").append(notesToRender);
  }

  function handleArticleNotes() {
    //for panel user clicks on
    var currentArticle = $(this)
      .parents(".panel")
      .data();
    $.get("/api/notes/" + currentArticle._id).then(function(data) {
      var modalText = [
        "<div class = 'container-fluid text-center'>",
        "<h4> Notes For articless: ",
        currentArticle._id,
        "</h4>",
        "<hr />",
        "<ul class = 'list-group note-container'>",
        "</ul>",
        "<textarea placeholder = 'Insert Your New Note' rows='4' cols= '60'></textarea>",
        "<button class = 'btn btn-success save'>Save Your Note</button>",
        "</div>"
      ].join("");
      //creates modal diolog
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var noteData = {
        _id: currentArticle._id,
        notes: data || []
      };
      ///adding new saved note and note data
      $(".btn.save").data("article", noteData);

      renderNotesList(noteData);
    });
  }

  function handleNoteSave() {
    var noteData;
    var newNote = $("bootbox-body textarea")
      .val()
      .trim();
    if (newNote) {
      noteData = {
        _id: $(this).data("article")._id,
        noteText: newNote
      };
      $.post("/api/notes", noteData).then(function() {
        bootbox.hideAll();
      });
    }
  }

  function handleNoteDelete() {
    var noteToDelete = $(this).data("_id");
    $.ajax({
      url: "/api/notes/" + noteToDelete,
      method: "DELETE"
    }).then(function() {
      bootbox.hideAll();
    });
  }

  function handleArticleDelete() {
    //  handles the delete of articles/headlines
    var articleToDelete = $(this)
      .parents(".panel")
      .data();
    $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(function(data) {
      if (data.ok) {
        initPage();
      }
    });
  }

  function renderEmpty() {
    var emptyAlert = $(["<div class = 'alert alert-warning text-center'>"]);
  }
});
