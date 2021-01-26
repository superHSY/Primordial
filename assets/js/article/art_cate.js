$(function(){
    var layer = layui.layer
    var form = layui.form
    //获取文章分类
    initArtCateList()


    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success: function(res){
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null;
    $('#btnAddCate').on('click',function(){
         indexAdd = layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          })               
    })

    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('添加失败')
                }
                initArtCateList()
                layer.msg('添加成功！')
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
    //为btn-edit绑定事件
    $('tbody').on('click','.btn-edit',function(){
        indexEdit = layer.open({
            type:1,
            area:['500px','250px'],
            title: '编辑文章分类',
            content: $('#dialog-edit').html()
          }) 
    var id = $(this).attr('data-id')
          $.ajax({
              method:'GET',
              url:'/my/article/cates/' + id,
              success: function(res){
                  form.val('form-edit',res.data)
              }
          })              
        })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    $('tbody').on('click','.btn-edit',function(){
        indexEdit = layer.open({
            type:1,
            area:['500px','250px'],
            title: '编辑文章分类',
            content: $('#dialog-edit').html()
          }) 
    var id = $(this).attr('data-id')
          $.ajax({
              method:'GET',
              url:'/my/article/cates/' + id,
              success: function(res){
                  form.val('form-edit',res.data)
              }
          })              
        })

    $('tbody').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除分类数据成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
            
          });
        

})