$(document).ready(function() {
	$("#BlockId").change(function() {
		var BlockId = $(this).val();
		if(BlockId != "") {
			$.ajax({
				url:"GetPanchayat.php",
				data:{c_id:BlockId},
				type:'POST',
				success:function(response) {
					var resp = $.trim(response);
					$("#PanchayatId").html(resp);
				}
			});
		} else {
			$("#PanchayatId").html("<option value=''>Select Panchayat</option>");
		}
	});
});
