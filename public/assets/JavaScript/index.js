$(document).ready(function() {
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handlArticleScrape);

  initPage();

  // empty article container  and use AJAX request for unsaved headlines
  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(function(data) {
      //  if there is headlines
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    let articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    let panel = $(
      [
        "<div class = 'panel panel-default'>",
        "<div class = 'panel-heading'>",
        "<h3>",
        article.headline,
        "<a class = 'btn button save'>",
        "Save Articles",
        "</a>",
        "</h3>",
        "</div>",

        "<div class = 'panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );

    panel.data("_id", article._id);
    return panel;
  }

  function handlArticleScrape() {
    $.get("/api/fetch").then(function(data) {
      initPage();
      bootbox.alert(
        "<h3 class = 'text-center m-top-80'>" + data.message + "<h3>"
      );
    });
  }
  function renderEmpty() {
    let emptyAlert = $(
      [
        "<div class = 'alert alert-warning text-center'>",
        "<h4>Ooops. There are no new Articless to read.</h4>",
        "</div>",
        "<div class = 'panel panel-default'>",
        "<h3>Where would you like to go?</>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class = 'scrape-new'> Get New Articless</a></h4>",
        "<h4> <a href = '/saved'>Saved Articless</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    articleContainer.append(emptyAlert);
  }

  function handleArticleSave() {
    var articleToSave = $(this)
      .parents(".panel")
      .data();
    articleToSave.saved = true;
    $.ajax({
      method: "PATCH",
      url: "/api/headlines",
      data: articleToSave
    }).then(function(data) {
      if (data.ok) {
        initPage();
      }
    });
  }
});
