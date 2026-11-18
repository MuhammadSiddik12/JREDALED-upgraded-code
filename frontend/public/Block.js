$(document).ready(function() {
	$("#DistrictId").change(function() {
		var DistrictId = $(this).val();
		if(DistrictId != "") {
			$.ajax({
				url:"GetBlock.php",
				data:{c_id:DistrictId},
				type:'POST',
				success:function(response) {
					var resp = $.trim(response);
					$("#BlockId").html(resp);
				}
			});
		} else {
			$("#BlockId").html("<option value=''>Select Block</option>");
		}
	});
});
