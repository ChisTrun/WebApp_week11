const updateCat = () => {
    if (confirm("Save your category?") == true) {
        $('.detailCatForm').attr('action', `https://${host}:${port}/api/categories/update`)
        $('.detailCatForm').submit();
    }
}

const addCat = () => {
    if (confirm("Add new category?") == true) {
        $('.addCatForm').attr('action', `https://${host}:${port}/api/categories/add`)
        $('.addCatForm').submit();
    }
}

const removeCat = () => {
    if (confirm("Remove category?") == true) {
        $('.detailCatForm').attr('action', `https://${host}:${port}/api/categories/remove`)
        $('.detailCatForm').submit();
    }
}

const detailCat = async (id) => {
    let url = `https://${host}:${port}/api/categories/CatID=${id}`
    $('.catContent #detail-tab-cat_pane .mssDetail').addClass('d-none');
    $('.detailCatForm').removeClass('d-none');
    $('.catContent #detail-tab-cat_pane').addClass('show active')
    $('.catContent #add-tab-cat_pane').removeClass('show active');
    $('.catTabs #add-tab').removeClass('active');
    $('.catTabs #detail-tab').addClass('active');
    let data = await fetch(url);
    data = (await data.json())[0];
    $('.detailCatForm .detailItem img').attr('src', `/images/pid/${data.ProID}/main_thumbs.jpg`);
    $('.detailCatForm .detailItem [name="CatID"]').val(data.CatID);
    $('.detailCatForm .detailItem [name="CatName"]').val(data.CatName);
}

$('.catRow').on('click', async function (e) {
    await detailCat($(this).attr('CatID'));
})