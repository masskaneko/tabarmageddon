function save_options() {
	const tabs_threshold = document.getElementById('tabs-threshold').value;
	chrome.storage.sync.set({
		tabsThreshold: tabs_threshold,
	}, function() {
		// Update status to let user know options were saved.
		const status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
			tabsThreshold: 20,
	}, function(items) {
		document.getElementById('tabs-threshold').value = items.tabsThreshold;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
		save_options);
