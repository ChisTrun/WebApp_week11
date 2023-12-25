const detailOrder = async (id) => {
    $('.detailTableBody').empty();
    $('.orderContent #detail-tab-cat_pane .mssDetail').addClass('d-none');
    $('.orderDetail').removeClass('d-none')
    let data = await fetch(`https://${host}:${port}/api/order/detail/OrderID=${id}`);
    data = (await data.json());
    $('.orderIDTitle').text(`OrderID: ${id}`)
    for(let order of data) {
        $('.detailTableBody').append(`
                            <tr >
                                <td class="colProName">${order.ProName}</td>
                                <td class="colQuantity">${order.Quantity}</td>
                                <td class="colPrice">${order.Price}</td>
                                <td class="colAmount">${order.Amount}</td>
                            </tr>
        `)
    }
}

$('.orderRow').on('click', async function (e) {
    await detailOrder($(this).attr('OrderID'));
})