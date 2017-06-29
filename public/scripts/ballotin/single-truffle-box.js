/*
 * Init GitHub
 */

// Get user/organization name and repo name.
var boxUserOrgName = $('.BallotinSingleContainer').data('user');
var boxRepositoryName = $('.BallotinSingleContainer').data('box');

// Set download and GitHub links.
$('#BoxDownloadLink').attr('href', 'https://github.com/' + boxUserOrgName + '/' + boxRepositoryName + '/archive/master.zip');
$('#BoxGitHubLink').attr('href', 'https://github.com/' + boxUserOrgName + '/' + boxRepositoryName);

// Create an unauthenticated GitHub API wrapper instance.
var gh = new GitHub();

// Get repo based on user/org and repo name above.
var boxRepo = gh.getRepo(boxUserOrgName, boxRepositoryName);

/*
 * Sync Interface
 */

// Get repo details and apply to interface.
boxRepo.getDetails(function(error, details) {
  $('#BoxDateCreated').html(formatGitHubDate(details.created_at));
  $('#BoxDateUpdated').html(formatGitHubDate(details.updated_at));
});

// Get readme, render markdown and apply to interface.
boxRepo.getReadme('heads/master', false)
.then(function(response) {
  var readmeHtml = marked(atob(response.data.content));

  // Remove first h1 element, as it's usually the repo name.
  var $readmeHtml = $(readmeHtml).not('h1:first-of-type');

  $('#BoxReadme').html($readmeHtml);
})
.catch(function(error) {
  console.error(error);

  var errorHtml = '<div class="alert alert-danger" role="alert">Error loading readme. If you keep seeing this error message, <a href="mailto:info@trufflesuite.com">reach out to truffle support at info@trufflesuite.com</a></div>';

  $('#BoxReadme').html(errorHtml);
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
