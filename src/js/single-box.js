const octokit = new Octokit();

/*octokit.authenticate({
  type: 'basic',
  username: '',
  password: ''
});*/


/*
 * Repo
 */

// Get user/organization name and repo name.
var boxUserOrgName = $('#boxInfo').data('userorg');
var boxRepoName = $('#boxInfo').data('repo');

// General Info
octokit.repos.get({owner: boxUserOrgName, repo: boxRepoName})
.then(function(result) {
  // Date
  $('#boxCreatedAt').html(formatGitHubDate(result.data.created_at));
  $('#boxUpdatedAt').html(formatGitHubDate(result.data.updated_at));

  // Stars
  $('#boxStarCount').html('<i class="fas fa-star text-warning"></i> ' + result.data.stargazers_count);
})
.catch(function(error) {
  console.error(error);
});


// Tags
$.getJSON('/data/boxes.json', function(data, textStatus, xhr) {
  if (textStatus === 'error') {
    return console.error(xhr.responseText);
  }

  const ghTags = data[boxRepoName]['tags'].join(', ');
  const currentTags = $(cardElement).find('.box-tags').text();
  
  var newTags = data[boxRepoName]['tags'].length > 0 ? currentTags + ', ' + ghTags : currentTags;

  $('#boxTags').html(newTags);
});

/*
octokit.repos.getTopics({owner: boxUserOrgName, repo: boxRepoName})
.then(function(result) {
  const boxTags = result.data.names.join(', ');

  $('#boxTags').html(boxTags);
})
.catch(function(error) {
  console.error(error);
});
*/

// Readme
octokit.repos.getReadme({owner: boxUserOrgName, repo: boxRepoName})
.then(function(result) {
  octokit.misc.renderMarkdown({text: atob(result.data.content)})
  .then(function(renderedResult) {
    var $readmeHtml = $(renderedResult.data).not('h1:first-of-type');

    $('#boxReadme').html($readmeHtml);
  })
  .catch(function(error) {
    $('#boxReadme').html('<div class="alert alert-danger"><strong>Error fetching readme</strong>: ' + error + '</div>');

    console.error(error);
  });
})
.catch(function(error) {
  console.error(error);
});


/*
 * Helper Functions
 */

// GitHub date formatting helper.
function formatGitHubDate(date) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var dateObject = new Date(date);
  var formattedDate = months[dateObject.getMonth()] + " " + dateObject.getDate() + ", " + dateObject.getFullYear();
  return formattedDate;
}