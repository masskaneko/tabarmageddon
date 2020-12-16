function chooseDeleteTabsIndexes(length) {
	console.log("length:", length);
	const deleting_tabs_indexes = [];

	if ( length <= 1 ) {
		return deleting_tabs_indexes;
	}

	const number_of_tabs_to_be_deleted = Math.round(length/2);
	console.log("number_of_tabs_to_be_deleted:", number_of_tabs_to_be_deleted);

	for (let i = 0; i < number_of_tabs_to_be_deleted; i++) {
		const new_index = Math.floor(Math.random() * length);
		if (deleting_tabs_indexes.indexOf(new_index) == -1) {
			deleting_tabs_indexes.push(new_index);
		}
	}
	return deleting_tabs_indexes;
}

function tabarmageddon(tabs) {
	const deleting_tabs_indexes = chooseDeleteTabsIndexes(tabs.length);

	for (const index of deleting_tabs_indexes) {
		chrome.tabs.remove(tabs[index].id);
		console.log("deleted:", tabs[index].url)
	}

	alert("How dare you opened lots of tabs!? Take this! Tabarmageddon!!");
}

function readTabsThreshold() {
	let th = 20;
	chrome.storage.sync.get({
		tabsThreshold: 20,
	}, function(items) {
		th = items.tabsThreshold;
	});

	return th;
}

chrome.tabs.onCreated.addListener(function(tab) {
	chrome.tabs.query({}, function(tabs){
		const th = readTabsThreshold();
		console.log(tabs.length, th);
		if(tabs.length > th) {
			tabarmageddon(tabs);
		}
	});
});
