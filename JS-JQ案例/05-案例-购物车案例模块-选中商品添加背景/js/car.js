$(function(){
    // 1. 案例-购物车案例模块-全选
    // 点击全选按钮,下面的商品对应的复选框全部选中
    // 再点击全选按钮,下面的商品对应的复选框全部不选中
    // 小复选框全部选中的时候,全选按钮就会选中;只要有一个小复选框没有选中,全选按钮就不选中
    // jquery复选框对象:checked 能够找到被选中的复选框

    // onchange表示状态发生改变时触发
    $(".checkall").change(function(){
        // console.log( $(this).prop("checked") );

        // 设置所有小复选框的选中状态
        $(".j-checkbox").prop("checked",  $(this).prop("checked") );
        // 设置所有全选复选框的选中状态
        $(".checkall").prop("checked",  $(this).prop("checked") );
       
        // 判断全选按钮是否选中
        if( $(this).prop("checked") ){// 如果选中,那么所有的.cart-item添加类名
            $(".cart-item").addClass("check-cart-item");
        }else{// 如果未选中,那么所有的.cart-item删除类名
            $(".cart-item").removeClass("check-cart-item");
        }

        getSum();
    })
    
    $(".j-checkbox").change(function(){
        // 得到选中的小复选框
        // console.log( $(".j-checkbox:checked") );
        // console.log( $(".j-checkbox:checked").length );
        // // 得到所有小复选框
        // console.log( $(".j-checkbox") );
        // console.log( $(".j-checkbox").length );
        
        // 判断选中的复选框个数是否等于全部小复选框的个数
        if( $(".j-checkbox:checked").length == $(".j-checkbox").length ){
            // 设置所有全选复选框为选中状态
            $(".checkall").prop("checked",  true );
        }else{
            // 设置所有全选复选框为不选中状态
            $(".checkall").prop("checked",  false );
        }

        // 6.选中商品添加背景
        // 1.核心思路：选中的商品添加背景，不选中移除背景即可
        // 2.全选按钮点击：如果全选是选中的，则所有的商品添加背景，否则移除背景
        // 3.小的复选框点击： 如果是选中状态，则当前商品添加背景，否则移除背景
        // 4.这个背景，可以通过类名修改，添加类和删除类

        // console.log( $(this).prop("checked") );

        if( $(this).prop("checked") ){
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else{
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }


        getSum();
    })


    /* 2.增减商品数量
    核心思路：首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    注意1： 只能增加本商品的数量， 就是当前+号的兄弟文本框（itxt）的值。
    修改表单的值是val() 方法
    注意2： 这个变量初始值应该是这个文本框的值，在这个值的基础上++。要获取表单的值
    减号（decrement）思路同理，但是如果文本框的值是1，就不能再减了。 */

    // 点击+号
    $(".increment").click(function(){
        // console.log( $(this) );
        // console.log( $(this).siblings(".itxt") );

        // 获取当前点击的那哥+号的兄弟元素文本框.txt的值
        var num = $(this).siblings(".itxt").val();
        // 自加1
        num++;
        // 再把加1以后的值,设置到文本框中
        $(this).siblings(".itxt").val( num );

        // 3.修改商品小计
        // 3.1 先获取单价
        // var price = $(this).parent().parent().siblings(".p-price").text().substr(1);
        var price = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        // 3.2 因为数量已经有了,所以不需要再重复获取数量,使用单价*数量就可以得到小计的金额了
        // 3.3 因为计算的时候,有可能会出现多位小数,所以我们只保留两位小数
        var subtotal = (price*num).toFixed(2);
        // 3.4 把小计金额放到对应位置上
        // $(this).parent().parent().siblings(".p-sum").text("￥" + subtotal );
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + subtotal );

        getSum();
    })

    // 点击-号
    $(".decrement").click(function(){
        // 获取当前文本框的值
        var num = $(this).siblings(".itxt").val();
        // 自减1
        num--;
        // 判断当前值是否小于等于0
        if( num <= 0 ){
            num = 1;
        }
        // 再把加1以后的值,设置到文本框中
        $(this).siblings(".itxt").val( num );

        // 3.修改商品小计
        // 3.1 先获取单价
        // var price = $(this).parent().parent().siblings(".p-price").text().substr(1);
        var price = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        // 3.2 因为数量已经有了,所以不需要再重复获取数量,使用单价*数量就可以得到小计的金额了
        // 3.3 因为计算的时候,有可能会出现多位小数,所以我们只保留两位小数
        var subtotal = (price*num).toFixed(2);
        // 3.4 把小计金额放到对应位置上
        // $(this).parent().parent().siblings(".p-sum").text("￥" + subtotal );
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + subtotal );

        getSum();
    })

    // 给.itxt对象绑定onkeyup事件
    $(".itxt").keyup(function(){
        // 商品数量
        var num =  $(this).val() ;

        // 先获取单价
        var price = $(this).parent().parent().siblings(".p-price").text().substr(1);
        // 因为数量已经有了,所以不需要再重复获取数量,使用单价*数量就可以得到小计的金额了
        // 因为计算的时候,有可能会出现多位小数,所以我们只保留两位小数
        var subtotal = (price*num).toFixed(2);
        // 把小计金额放到对应位置上
        // $(this).parent().parent().siblings(".p-sum").text("￥" + subtotal );
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + subtotal );

        getSum();
    })


    // 4.计算总计和总额
    // 4.1 核心思路：把所有文本框里面的值相加就是总计数量。总额同理
    // 4.2 文本框里面的值不相同，如果想要相加需要用到each遍历。声明一个变量，相加即可
    // 4.3 点击+号-号，会改变总计和总额，如果用户修改了文本框里面的值同样会改变总计和总额
    // 4.4 因此可以封装一个函数求总计和总额的， 以上2个操作调用这个函数即可。
    // 4.5 注意1： 总计是文本框里面的值相加用 val() 总额是普通元素的内容用text()
    // 4.6 要注意普通元素里面的内容要去掉￥并且转换为数字型才能相加

    // 封装一个获取总数量和总金额的函数
    function getSum(){
        // 当前小复选框被选中的对应的商品金额和商品数量我们才计算
        // console.log( $(".j-checkbox:checked") );

        // 定义一个count变量,保存总个数
        var count = 0;

        // 定义一个total变量,保存总金额
        var total = 0;

        $(".j-checkbox:checked").each( function( index , domElement ){
            count += parseInt( $(this).parent().siblings(".p-num").find(".itxt").val()) ;
            total += parseFloat( $(this).parent().siblings(".p-sum").text().substr(1) );
        } )

        // 设置总数量
        $(".amount-sum em").text( count )

        // 设置总金额
        total = total.toFixed(2);
        $(".price-sum em").text( "￥" + total );

    }
    getSum();


    // 5.删除商品模块
    // 5.1 核心思路：把商品remove() 删除元素即可
    // 5.2 有三个地方需要删除： 1. 商品后面的删除按钮 2. 删除选中的商品 3. 清理购物车
    // 5.3 商品后面的删除按钮： 一定是删除当前的商品，所以从 $(this) 出发
    // 5.4 删除选中的商品： 先判断小的复选框按钮是否选中状态，如果是选中，则删除对应的商品
    // 5.5 清理购物车： 则是把所有的商品全部删掉
    
    // 1. 商品后面的删除按钮
    $(".p-action").find("a").click(function(){
        // console.log( $(this) );
        // console.log( $(this).parents() );
        // console.log( $(this).parents(".cart-item") );
        $(this).parents(".cart-item").remove();

        getSum();
    })

    // 2. 删除选中的商品
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();

        getSum();
    })

    // 3. 清理购物车
    $(".clear-all").click(function(){
        $(".j-checkbox").parents(".cart-item").remove();
        getSum();
    })  
    
})