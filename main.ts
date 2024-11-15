const watiScript = document.currentScript;

const attrs = {
	src: "https://changs-fashion.myshopify.com/cdn/shop/files/whatsapp.webp?width=200",
	site: "",
	phone: "",
	width: "60",
	height: "60",
	alt: "Click to Whatsapp",
	elm: "",
	style: "",
	welcome:
		"Hello, I am very interested in this product and would like to contact you further.",
	end: "Thank you \u{1F91D}.",
};

if (watiScript) {
	const attributes = watiScript.attributes;
	for (let d = 0; d < attributes.length; d++) {
		const attr = attributes[d].name;
		attr.indexOf("data-") === 0 && (attrs[attr.slice(5)] = attributes[d].value);
	}
	console.log(attrs);
}

const ShortAPI = 'https://spoo.me/';
const GclidKey = 'wati-capi-glcid';
const KeyFrom = "watisdk";

const appendSearch = (url: string, str: string) => {
	return new URL(url).search
		? `${url}&${str}`
		: `${url}?${str}`;
}

const shortUrl = async (link: string) => {
	try {
		const response = await fetch(ShortAPI, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "application/json",
			},
			body: new URLSearchParams({ url: link }),
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data);
			const shortCode = new URL(data.short_url).pathname.slice(1);
			return appendSearch(location.origin + location.pathname, `gid=${shortCode}&from=${KeyFrom}`)
		} else {
			console.error(`HTTP error! Status: ${response.status}`);
			return link;
		}
	} catch (error) {
		console.error(`Fetch error: ${error}`);
		return link;
	}
};

document.addEventListener("DOMContentLoaded", function () {
	if (!attrs.phone) return;

	const search = new URLSearchParams(location.search);
	const domId = "wati-capi-img";
	if (search.has('gclid')) {
		localStorage.setItem(GclidKey, search.toString())
	}

	const img = document.createElement("img");
	img.setAttribute("id", domId);
	img.setAttribute("src", attrs.src);
	img.setAttribute("width", attrs.width);
	img.setAttribute("height", attrs.height);
	img.setAttribute("alt", attrs.alt);
	img.setAttribute("loading", "lazy");
	img.style.cursor = "pointer";
	if (attrs.style) {
		var style = document.createElement("style");
		style.innerHTML = `#${domId} { ${attrs.style} }`;
		document.getElementsByTagName("head")[0].appendChild(style);
	} else {
		img.style.position = "fixed";
		img.style.zIndex = "999";
		img.style.bottom = "10px";
		img.style.right = "10px";
	}

	img.addEventListener("click", async () => {
		let url = location.href;
		// let url =
		//   "https://changs-fashion.myshopify.com/?utm_source=Shopify&utm_medium=Test&utm_campaign=Nick_search&utm_id=Search&campaignid=21316395726&adgroupid=163138464215&adid=700580563874&utm_term=online%20fashion&utm_campaign=Nick_Test_Search&utm_source=adwords&utm_medium=ppc&hsa_acc=2848569700&hsa_cam=21316395726&hsa_grp=163138464215&hsa_ad=700580563874&hsa_src=g&hsa_tgt=kwd-49537602&hsa_kw=online%20fashion&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjwoJa2BhBPEiwA0l0ImC4cr4bsuVco-zQKe9yIlSoJbso_L8NBr8usF3cExVvbQsOJeXfibRoC2O0QAvD_BwE";
		if (!location.search.includes('gclid')) {
			const gclid = localStorage.getItem(GclidKey);
			if (gclid) {
				url = appendSearch(url, gclid);
			}
		}
		url = await shortUrl(url);
		if (attrs.site) {
			url = appendSearch(attrs.site, url.split('?')[1] || "")
		}
		console.log(url);
		const text = encodeURIComponent(
			`${attrs.welcome} ${url}\n${attrs.end}`
		);
		const target = `https://api.whatsapp.com/send/?phone=${encodeURIComponent(
			attrs.phone
		)}&text=${text}&type=phone_number&app_absent=0&${search.toString()}`;
		console.log("target:", target);
		window.open(target, "_blank");
	});
	if (attrs["elm"]) {
		document.querySelector(attrs["elm"]).appendChild(img);
	} else {
		document.body.appendChild(img);
	}
});
