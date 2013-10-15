$(function() {

    var app = {
        init: function() {
            this.user = {};
            $('.home-content').addClass('hidden');
            $('.menu-crud').addClass('hidden');
            $('.menu-user').addClass('hidden');
            $('.menu-loading').removeClass('hidden');
            $('.menu-user').addClass('hidden');
            $('.btn-login').addClass('hidden');

            $('.btn-login').attr('href', '/api/login?url=/');
            $('.btn-logout').attr('href','/api/logout?url=/');

            this.router = new Router();
            this.setEventListeners();
            this.getUser();

            Backbone.history.start({pushState: true});
        },
        setEventListeners: function() {
            var self = this;
            $('.menu-crud .item a').click(function(ev) {
                var $el = $(ev.target).closest('.item');

                $('.menu-crud .item').removeClass('active');
                $el.addClass("active");

                if ($el.hasClass('menu-list')) {
                    self.router.navigate('list', {trigger: true});
                }

                if ($el.hasClass('menu-create')) {
                    self.router.navigate('new', {trigger: true});
                 }
                 if ($el.hasClass('home')) {
                     self.router.navigate('user', {trigger: true});
                 }
            });
            $('.home item').click(function() {
                self.router.navigate('', {trigger: true});
            });

        },
        getUser: function() {
            var self = this;
            $.ajax({
                method: 'GET',
                url: '/api/users/me',
                success: function(me) {
                    // user is already signed in
                    console.log(me);
                    self.user = me;
                    self.router.navigate('user', {trigger: true});
                },

                error: function(err) {
                    console.log('you have not authenticated');
                    self.router.navigate('login', {trigger: true});
                }
            });
        },
        showLogin: function() {
           $('.menu-loading').addClass('hidden');
           $('.menu-user').addClass('hidden');
           $('.btn-login').removeClass('hidden');
           $('.home-sign-in').removeClass('hidden');
        },
        showLogout: function() {
           $('.menu-crud').removeClass('hidden');
           $('.user-email').text(this.user.email);
           $('.menu-loading').addClass('hidden');
           $('.btn-login').addClass('hidden');
           $('.menu-user').removeClass('hidden');
           $('.home-sign-in').addClass('hidden');
           $('.home-content').removeClass('hidden');
           $('.app-content').html('');
        },
        showHome: function() {
            $('.app-content').html('');
        },
        showList: function() {
            var $listTemplate = getTemplate('tpl-thesis-list');
            $('.home-content').addClass('hidden');
            $('.app-content').html($listTemplate);
        },
        getThesisByID: function(id, callback) {
            var object = {};
            $.get('/api/thesis/' + id, function(item) {
                callback(item);
            });
        },
        showThesis: function(thesis) {
            var self = this;
            var $viewTemplate = getTemplate('tpl-thesis-detail', thesis);
            $('.home-content').addClass('hidden');
            $('.app-content').html($viewTemplate);

        },
        showForm: function(object) {
            var self = this;
            if (!object) {
                object = {};
            }
            var $formTemplate = getTemplate('tpl-thesis-form', object);
            $('.home-content').addClass('hidden');
            $('.app-content').html($formTemplate);


            $('form').unbind('submit').submit(function(ev) {
                var thesisObject = {};
                var inputs = $('form').serializeArray();
                for (var i = 0; i < inputs.length; i++) {
                    thesisObject[inputs[i].name] = inputs[i].value;
                }
                self.save(thesisObject);
                return false;
            });

        },
        loadAllThesis: function() {
            var self = this;
            setTimeout(function() {
                $.get('/api/thesis', function(res) {
                    self.displayLoadedList(res);
                });
            }, 200);
        },
        displayLoadedList: function(list) {
            var self = this;
            
            _.each(list, function(item) {
                var $thesisItem = $(getTemplate('tpl-thesis-list-item', item));
                var id = item.Id
                if (item.Key) {
                    id = item.Key;
                }
                $thesisItem.find('.edit-thesis').click(function() {
                    self.router.navigate('edit-' + id, {trigger: true});
                });
                $thesisItem.find('.view-thesis').click(function() {
                    self.router.navigate('thesis-' + id, {trigger: true});
                });
                $('.thesis-list').append($thesisItem);

                $('.menu-crud .item:eq(1)').removeClass('active');
                $('.menu-crud .item:eq(2)').addClass('active');

            });


        },
        save: function(object) {
            var self = this;
            $.post('/api/thesis', object, function(res) {
                self.router.navigate('list', {trigger: true});
            });
            return false;
        }


    };

    function getTemplate(template_id, context) {
        var template, $template, markup;
        template = $('#' + template_id);
        $template = Handlebars.compile(template.html());
        markup = $template(context);
        return markup;

    }
    var Router = Backbone.Router.extend({
        routes: {
            '': 'onHome',
            'thesis-:id': 'onView',
            'new': 'onCreate',
            'edit-:id': 'onEdit',
            'list': 'onList',
            'user': 'onLogout',
            'login': 'onLogin'
        },

       onHome: function() {
            app.showHome();
       },

       onLogout: function() {
            app.showLogout();
       },

       onLogin: function() {
            app.showLogin();
       },

       onView: function(id) {
           console.log('thesis id', id);
            app.getThesisByID(id, function(item) {
                app.showThesis(item);
                FB.XFBML.parse();
            });
       },

       onCreate: function() {
            app.showForm();
       },

       onEdit: function(id) {
            app.getThesisByID(id, function(item) {
                app.showForm(item);
            });
       },

       onList: function() {
            app.showList();
            app.loadAllThesis();
       }

    });

    app.init();

});