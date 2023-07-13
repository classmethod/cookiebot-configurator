interface configProps {
  cbid: string;
  gtm: string;
  blockmode: string;
}

export default function GenerateCode(data: configProps) {
  const {
    cbid,
    gtm,
    blockmode,
    //directory
  } = data;

  let elementHeader = ""
  let elementBody = ""

  if(gtm !== (null||"")){
    elementHeader += `<!-- Google Consent Mode -->
    <script data-cookieconsent="ignore">
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments)
        }
      gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
        wait_for_update: 500
      });
      gtag("set", "ads_data_redaction", true);
      gtag("set", "url_passthrough", true);
    </script>
    <!-- End Google Consent Mode-->

    <!-- Google Tag Manager -->
    <script data-cookieconsent="ignore">
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtm}');</script>
    <!-- End Google Tag Manager -->`

    elementBody += `<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtm}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`
  }
  
  if(cbid !== (null||"")){
    elementHeader += `<!-- Cookiebot CMP-->
    <script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid="${cbid}"
      data-blockingmode="${blockmode || `auto`}"
      type="text/javascript"
    ></script>
    <!-- End Cookiebot CMP -->`
  }

  return `export default {
    async fetch(request) {
      const { pathname } = request.url;

      class HeadRewriter {
        element(element) {
            element.prepend(\`${elementHeader}\`, { html: true });
        }
        }

        class BodyRewriter {
        element(element) {
            element.prepend(\`${elementBody}\`, { html: true });
        }
        }

        const res = await fetch(request);
        const contentType = res.headers.get("Content-Type");

        if (contentType.startsWith("text/html")) {
        return new HTMLRewriter()
          .on("head", new HeadRewriter())
          .on("body", new BodyRewriter())
          .transform(res);
        } else {
        return res;
        }
    }
  }`
}
