$(document).ready(function() {
  let articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);

  $(document).on("click", "scrape-new", handlArticleScrape);

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

    //here

    function createPanel(article) {
      let panel = $(
        [
          "<div class = 'panel panel-default'>",
          "<div class = 'panel-heading'>",
          "<h3>",
          article.headline,
          "<a class = 'btn button save'>",
          "Save Squawk",
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

      // here @ 29:45
    }
  }
});
