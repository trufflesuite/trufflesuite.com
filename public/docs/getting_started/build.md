# Build Pipeline

Truffle 1.0 and 2.0 came standard with a default build system heavily geared toward web applications (here, the term "build" means turning code artifacts into HTML, Javascript and CSS). That build system has been pulled out into its [own module](https://github.com/trufflesuite/truffle-default-builder/tree/master) to make Truffle usable and extensible for all kinds of applications.

Truffle can be configured for tight integration with any build system. To configure a custom build system, see the [Advanced Build Processes](/docs/advanced/build_processes) section for more details.

# Command

To build your application when a build system is configured, run:

```none
$ truffle build
```

Note you'll receive an error if you try to run the `build` command without first configuring a custom build process.

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-83874933-1', 'auto');
  ga('send', 'pageview');
</script>
