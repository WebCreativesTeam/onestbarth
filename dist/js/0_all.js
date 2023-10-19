! function(e) {
    var n, t, i = e.event;
    n = i.special.debouncedresize = {
        setup: function() {
            e(this).on("resize", n.handler)
        },
        teardown: function() {
            e(this).off("resize", n.handler)
        },
        handler: function(e, o) {
            var r = this,
                s = arguments,
                d = function() {
                    e.type = "debouncedresize", i.dispatch.apply(r, s)
                };
            t && clearTimeout(t), o ? d() : t = setTimeout(d, n.threshold)
        },
        threshold: 150
    }
}(jQuery);
! function(e) {
    function t(e) {
        return "object" == typeof e ? e : {
            top: e,
            left: e
        }
    }
    var o = e.scrollTo = function(t, o, n) {
        e(window).scrollTo(t, o, n)
    };
    o.defaults = {
        axis: "xy",
        duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
        limit: !0
    }, o.window = function(t) {
        return e(window)._scrollable()
    }, e.fn._scrollable = function() {
        return this.map(function() {
            var t = this;
            if (!(!t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]))) return t;
            var o = (t.contentWindow || t).document || t.ownerDocument || t;
            return /webkit/i.test(navigator.userAgent) || "BackCompat" == o.compatMode ? o.body : o.documentElement
        })
    }, e.fn.scrollTo = function(n, r, i) {
        return "object" == typeof r && (i = r, r = 0), "function" == typeof i && (i = {
            onAfter: i
        }), "max" == n && (n = 9e9), i = e.extend({}, o.defaults, i), r = r || i.duration, i.queue = i.queue && i.axis.length > 1, i.queue && (r /= 2), i.offset = t(i.offset), i.over = t(i.over), this._scrollable().each(function() {
            function a(e) {
                c.animate(u, r, i.easing, e && function() {
                    e.call(this, f, i)
                })
            }
            if (null != n) {
                var s, l = this,
                    c = e(l),
                    f = n,
                    u = {},
                    d = c.is("html,body");
                switch (typeof f) {
                    case "number":
                    case "string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(f)) {
                            f = t(f);
                            break
                        }
                        if (!(f = e(f, this)).length) return;
                    case "object":
                        (f.is || f.style) && (s = (f = e(f)).offset())
                }
                e.each(i.axis.split(""), function(e, t) {
                    var n = "x" == t ? "Left" : "Top",
                        r = n.toLowerCase(),
                        h = "scroll" + n,
                        m = l[h],
                        p = o.max(l, t);
                    if (s) u[h] = s[r] + (d ? 0 : m - c.offset()[r]), i.margin && (u[h] -= parseInt(f.css("margin" + n)) || 0, u[h] -= parseInt(f.css("border" + n + "Width")) || 0), u[h] += i.offset[r] || 0, i.over[r] && (u[h] += f["x" == t ? "width" : "height"]() * i.over[r]);
                    else {
                        var v = f[r];
                        u[h] = v.slice && "%" == v.slice(-1) ? parseFloat(v) / 100 * p : v
                    }
                    i.limit && /^\d+$/.test(u[h]) && (u[h] = u[h] <= 0 ? 0 : Math.min(u[h], p)), !e && i.queue && (m != u[h] && a(i.onAfterFirst), delete u[h])
                }), a(i.onAfter)
            }
        }).end()
    }, o.max = function(t, o) {
        var n = "x" == o ? "Width" : "Height",
            r = "scroll" + n;
        if (!e(t).is("html,body")) return t[r] - e(t)[n.toLowerCase()]();
        var i = "client" + n,
            a = t.ownerDocument.documentElement,
            s = t.ownerDocument.body;
        return Math.max(a[r], s[r]) - Math.min(a[i], s[i])
    }
}(jQuery),
function(e) {
    function t(t, o, n) {
        var r = o.hash.slice(1),
            i = document.getElementById(r) || document.getElementsByName(r)[0];
        if (i) {
            t && t.preventDefault();
            var a = e(n.target);
            if (!(n.lock && a.is(":animated") || n.onBefore && !1 === n.onBefore(t, i, a))) {
                if (n.stop && a._scrollable().stop(!0), n.hash) {
                    var s = n.offset;
                    s = s && s.top || s || 0;
                    var l = i.id == r ? "id" : "name",
                        c = e("<a> </a>").attr(l, r).css({
                            position: "absolute",
                            top: e(window).scrollTop() + s,
                            left: e(window).scrollLeft()
                        });
                    i[l] = "", e("body").prepend(c), location = o.hash, c.remove(), i[l] = r
                }
                a.scrollTo(i, n).trigger("notify.serialScroll", [i])
            }
        }
    }
    var o = location.href.replace(/#.*/, ""),
        n = e.localScroll = function(t) {
            e("body").localScroll(t)
        };
    n.defaults = {
        duration: 1e3,
        axis: "y",
        event: "click",
        stop: !0,
        target: window,
        reset: !0
    }, n.hash = function(o) {
        if (location.hash) {
            if (o = e.extend({}, n.defaults, o), o.hash = !1, o.reset) {
                var r = o.duration;
                delete o.duration, e(o.target).scrollTo(0, o), o.duration = r
            }
            t(0, location, o)
        }
    }, e.fn.localScroll = function(r) {
        function i() {
            return !!this.href && !!this.hash && this.href.replace(this.hash, "") == o && (!r.filter || e(this).is(r.filter))
        }
        return (r = e.extend({}, n.defaults, r)).lazy ? this.bind(r.event, function(o) {
            var n = e([o.target, o.target.parentNode]).filter(i)[0];
            n && t(o, n, r)
        }) : this.find("a,area").filter(i).bind(r.event, function(e) {
            t(e, this, r)
        }).end().end()
    }
}(jQuery);
! function(t, e, i, s) {
    function n(e, i) {
        this.settings = null, this.options = t.extend({}, n.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, t.each(["onResize", "onThrottledResize"], t.proxy(function(e, i) {
            this._handlers[i] = t.proxy(this[i], this)
        }, this)), t.each(n.Plugins, t.proxy(function(t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(n.Workers, t.proxy(function(e, i) {
            this._pipe.push({
                filter: i.filter,
                run: t.proxy(i.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    n.Defaults = {
        items: 4,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, n.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, n.Type = {
        Event: "event",
        State: "state"
    }, n.Plugins = {}, n.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = this.settings.margin || "",
                i = !this.settings.autoWidth,
                s = this.settings.rtl,
                n = {
                    width: "auto",
                    "margin-left": s ? e : "",
                    "margin-right": s ? "" : e
                };
            !i && this.$stage.children().css(n), t.css = n
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                i = null,
                s = this._items.length,
                n = !this.settings.autoWidth,
                o = [];
            for (t.items = {
                    merge: !1,
                    width: e
                }; s--;) i = this._mergers[s], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = i > 1 || t.items.merge, o[s] = n ? e * i : this._items[s].width();
            this._widths = o
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var e = [],
                i = this._items,
                s = this.settings,
                n = Math.max(2 * s.items, 4),
                o = 2 * Math.ceil(i.length / 2),
                r = s.loop && i.length ? s.rewind ? n : Math.max(n, o) : 0,
                a = "",
                h = "";
            for (r /= 2; r--;) e.push(this.normalize(e.length / 2, !0)), a += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), h = i[e[e.length - 1]][0].outerHTML + h;
            this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(h).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, s = 0, n = 0, o = []; ++i < e;) s = o[i - 1] || 0, n = this._widths[this.relative(i)] + this.settings.margin, o.push(s + n * t);
            this._coordinates = o
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t = this.settings.stagePadding,
                e = this._coordinates,
                i = {
                    width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                    "padding-left": t || "",
                    "padding-right": t || ""
                };
            this.$stage.css(i)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            var e = this._coordinates.length,
                i = !this.settings.autoWidth,
                s = this.$stage.children();
            if (i && t.items.merge)
                for (; e--;) t.css.width = this._widths[this.relative(e)], s.eq(e).css(t.css);
            else i && (t.css.width = t.items.width, s.css(t.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var t, e, i, s, n = this.settings.rtl ? 1 : -1,
                o = 2 * this.settings.stagePadding,
                r = this.coordinates(this.current()) + o,
                a = r + this.width() * n,
                h = [];
            for (i = 0, s = this._coordinates.length; i < s; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * n, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && h.push(i);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + h.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], n.prototype.initialize = function() {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var e, i, s;
            e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : void 0, s = this.$element.children(i).width(), e.length && s <= 0 && this.preloadAutoWidthImages(e)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, n.prototype.setup = function() {
        var e = this.viewport(),
            i = this.options.responsive,
            s = -1,
            n = null;
        i ? (t.each(i, function(t) {
            t <= e && t > s && (s = Number(t))
        }), "function" == typeof(n = t.extend({}, this.options, i[s])).stagePadding && (n.stagePadding = n.stagePadding()), delete n.responsive, n.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + s))) : n = t.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: n
            }
        }), this._breakpoint = s, this.settings = n, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, n.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, n.prototype.prepare = function(e) {
        var i = this.trigger("prepare", {
            content: e
        });
        return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
            content: i.data
        }), i.data
    }, n.prototype.update = function() {
        for (var e = 0, i = this._pipe.length, s = t.proxy(function(t) {
                return this[t]
            }, this._invalidated), n = {}; e < i;)(this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(n), e++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, n.prototype.width = function(t) {
        switch (t = t || n.Width.Default) {
            case n.Width.Inner:
            case n.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, n.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, n.prototype.onThrottledResize = function() {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, n.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, n.prototype.registerEventHandlers = function() {
        t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
    }, n.prototype.onDragStart = function(e) {
        var s = null;
        3 !== e.which && (t.support.transform ? s = {
            x: (s = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === s.length ? 12 : 4],
            y: s[16 === s.length ? 13 : 5]
        } : (s = this.$stage.position(), s = {
            x: this.settings.rtl ? s.left + this.$stage.width() - this.width() + this.settings.margin : s.left,
            y: s.top
        }), this.is("animating") && (t.support.transform ? this.animate(s.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = s, this._drag.stage.current = s, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function(e) {
            var s = this.difference(this._drag.pointer, this.pointer(e));
            t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(s.x) < Math.abs(s.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, n.prototype.onDragMove = function(t) {
        var e = null,
            i = null,
            s = null,
            n = this.difference(this._drag.pointer, this.pointer(t)),
            o = this.difference(this._drag.stage.start, n);
        this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), s = this.settings.pullDrag ? -1 * n.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + s), i + s)), this._drag.stage.current = o, this.animate(o.x))
    }, n.prototype.onDragEnd = function(e) {
        var s = this.difference(this._drag.pointer, this.pointer(e)),
            n = this._drag.stage.current,
            o = s.x > 0 ^ this.settings.rtl ? "left" : "right";
        t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== s.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(n.x, 0 !== s.x ? o : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = o, (Math.abs(s.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, n.prototype.closest = function(e, i) {
        var s = -1,
            n = this.width(),
            o = this.coordinates();
        return this.settings.freeDrag || t.each(o, t.proxy(function(t, r) {
            return "left" === i && e > r - 30 && e < r + 30 ? s = t : "right" === i && e > r - n - 30 && e < r - n + 30 ? s = t + 1 : this.op(e, "<", r) && this.op(e, ">", o[t + 1] || r - n) && (s = "left" === i ? t + 1 : t), -1 === s
        }, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? s = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (s = e = this.maximum())), s
    }, n.prototype.animate = function(e) {
        var i = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : i ? this.$stage.animate({
            left: e + "px"
        }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: e + "px"
        })
    }, n.prototype.is = function(t) {
        return this._states.current[t] && this._states.current[t] > 0
    }, n.prototype.current = function(t) {
        if (void 0 === t) return this._current;
        if (0 !== this._items.length) {
            if (t = this.normalize(t), this._current !== t) {
                var e = this.trigger("change", {
                    property: {
                        name: "position",
                        value: t
                    }
                });
                void 0 !== e.data && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                })
            }
            return this._current
        }
    }, n.prototype.invalidate = function(e) {
        return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function(t, e) {
            return e
        })
    }, n.prototype.reset = function(t) {
        void 0 !== (t = this.normalize(t)) && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, n.prototype.normalize = function(t, e) {
        var i = this._items.length,
            s = e ? 0 : this._clones.length;
        return !this.isNumeric(t) || i < 1 ? t = void 0 : (t < 0 || t >= i + s) && (t = ((t - s / 2) % i + i) % i + s / 2), t
    }, n.prototype.relative = function(t) {
        return t -= this._clones.length / 2, this.normalize(t, !0)
    }, n.prototype.maximum = function(t) {
        var e, i, s, n = this.settings,
            o = this._coordinates.length;
        if (n.loop) o = this._clones.length / 2 + this._items.length - 1;
        else if (n.autoWidth || n.merge) {
            for (e = this._items.length, i = this._items[--e].width(), s = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > s););
            o = e + 1
        } else o = n.center ? this._items.length - 1 : this._items.length - n.items;
        return t && (o -= this._clones.length / 2), Math.max(o, 0)
    }, n.prototype.minimum = function(t) {
        return t ? 0 : this._clones.length / 2
    }, n.prototype.items = function(t) {
        return void 0 === t ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, n.prototype.mergers = function(t) {
        return void 0 === t ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, n.prototype.clones = function(e) {
        var i = this._clones.length / 2,
            s = i + this._items.length,
            n = function(t) {
                return t % 2 == 0 ? s + t / 2 : i - (t + 1) / 2
            };
        return void 0 === e ? t.map(this._clones, function(t, e) {
            return n(e)
        }) : t.map(this._clones, function(t, i) {
            return t === e ? n(i) : null
        })
    }, n.prototype.speed = function(t) {
        return void 0 !== t && (this._speed = t), this._speed
    }, n.prototype.coordinates = function(e) {
        var i, s = 1,
            n = e - 1;
        return void 0 === e ? t.map(this._coordinates, t.proxy(function(t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (this.settings.rtl && (s = -1, n = e + 1), i = this._coordinates[e], i += (this.width() - i + (this._coordinates[n] || 0)) / 2 * s) : i = this._coordinates[n] || 0, i = Math.ceil(i))
    }, n.prototype.duration = function(t, e, i) {
        return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, n.prototype.to = function(t, e) {
        var i = this.current(),
            s = null,
            n = t - this.relative(i),
            o = (n > 0) - (n < 0),
            r = this._items.length,
            a = this.minimum(),
            h = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(n) > r / 2 && (n += -1 * o * r), (s = (((t = i + n) - a) % r + r) % r + a) !== t && s - n <= h && s - n > 0 && (i = s - n, t = s, this.reset(i))) : t = this.settings.rewind ? (t % (h += 1) + h) % h : Math.max(a, Math.min(h, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
    }, n.prototype.next = function(t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, n.prototype.prev = function(t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, n.prototype.onTransitionEnd = function(t) {
        if (void 0 !== t && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, n.prototype.viewport = function() {
        var s;
        return this.options.responsiveBaseElement !== e ? s = t(this.options.responsiveBaseElement).width() : e.innerWidth ? s = e.innerWidth : i.documentElement && i.documentElement.clientWidth ? s = i.documentElement.clientWidth : console.warn("Can not detect viewport width."), s
    }, n.prototype.replace = function(e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
            return 1 === this.nodeType
        }).each(t.proxy(function(t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, n.prototype.add = function(e, i) {
        var s = this.relative(this._current);
        i = void 0 === i ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
            content: e,
            position: i
        }), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[s] && this.reset(this._items[s].index()), this.invalidate("items"), this.trigger("added", {
            content: e,
            position: i
        })
    }, n.prototype.remove = function(t) {
        void 0 !== (t = this.normalize(t, !0)) && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, n.prototype.preloadAutoWidthImages = function(e) {
        e.each(t.proxy(function(e, i) {
            this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy(function(t) {
                i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
        }, this))
    }, n.prototype.destroy = function() {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
        for (var s in this._plugins) this._plugins[s].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, n.prototype.op = function(t, e, i) {
        var s = this.settings.rtl;
        switch (e) {
            case "<":
                return s ? t > i : t < i;
            case ">":
                return s ? t < i : t > i;
            case ">=":
                return s ? t <= i : t >= i;
            case "<=":
                return s ? t >= i : t <= i
        }
    }, n.prototype.on = function(t, e, i, s) {
        t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
    }, n.prototype.off = function(t, e, i, s) {
        t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
    }, n.prototype.trigger = function(e, i, s, o, r) {
        var a = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            h = t.camelCase(t.grep(["on", e, s], function(t) {
                return t
            }).join("-").toLowerCase()),
            l = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({
                relatedTarget: this
            }, a, i));
        return this._supress[e] || (t.each(this._plugins, function(t, e) {
            e.onTrigger && e.onTrigger(l)
        }), this.register({
            type: n.Type.Event,
            name: e
        }), this.$element.trigger(l), this.settings && "function" == typeof this.settings[h] && this.settings[h].call(this, l)), l
    }, n.prototype.enter = function(e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
            void 0 === this._states.current[e] && (this._states.current[e] = 0), this._states.current[e]++
        }, this))
    }, n.prototype.leave = function(e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
            this._states.current[e]--
        }, this))
    }, n.prototype.register = function(e) {
        if (e.type === n.Type.Event) {
            if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
                var i = t.event.special[e.name]._default;
                t.event.special[e.name]._default = function(t) {
                    return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
                }, t.event.special[e.name].owl = !0
            }
        } else e.type === n.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function(i, s) {
            return t.inArray(i, this._states.tags[e.name]) === s
        }, this)))
    }, n.prototype.suppress = function(e) {
        t.each(e, t.proxy(function(t, e) {
            this._supress[e] = !0
        }, this))
    }, n.prototype.release = function(e) {
        t.each(e, t.proxy(function(t, e) {
            delete this._supress[e]
        }, this))
    }, n.prototype.pointer = function(t) {
        var i = {
            x: null,
            y: null
        };
        return t = t.originalEvent || t || e.event, (t = t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
    }, n.prototype.isNumeric = function(t) {
        return !isNaN(parseFloat(t))
    }, n.prototype.difference = function(t, e) {
        return {
            x: t.x - e.x,
            y: t.y - e.y
        }
    }, t.fn.owlCarousel = function(e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var s = t(this),
                o = s.data("owl.carousel");
            o || (o = new n(this, "object" == typeof e && e), s.data("owl.carousel", o), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(e, i) {
                o.register({
                    type: n.Type.Event,
                    name: i
                }), o.$element.on(i + ".owl.carousel.core", t.proxy(function(t) {
                    t.namespace && t.relatedTarget !== this && (this.suppress([i]), o[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
                }, o))
            })), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i)
        })
    }, t.fn.owlCarousel.Constructor = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, n.prototype.watch = function() {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, n.prototype.refresh = function() {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, n.prototype.destroy = function() {
        var t, i;
        e.clearInterval(this._interval);
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function(e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                    for (var i = this._core.settings, s = i.center && Math.ceil(i.items / 2) || i.items, n = i.center && -1 * s || 0, o = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + n, r = this._core.clones().length, a = t.proxy(function(t, e) {
                            this.load(e)
                        }, this); n++ < s;) this.load(r / 2 + this._core.relative(o)), r && t.each(this._core.clones(this._core.relative(o)), a), o++
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {
        lazyLoad: !1
    }, n.prototype.load = function(i) {
        var s = this._core.$stage.children().eq(i),
            n = s && s.find(".owl-lazy");
        !n || t.inArray(s.get(0), this._loaded) > -1 || (n.each(t.proxy(function(i, s) {
            var n, o = t(s),
                r = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
            this._core.trigger("load", {
                element: o,
                url: r
            }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function() {
                o.css("opacity", 1), this._core.trigger("loaded", {
                    element: o,
                    url: r
                }, "lazy")
            }, this)).attr("src", r) : ((n = new Image).onload = t.proxy(function() {
                o.css({
                    "background-image": 'url("' + r + '")',
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: o,
                    url: r
                }, "lazy")
            }, this), n.src = r)
        }, this)), this._loaded.push(s.get(0)))
    }, n.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Lazy = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this),
            "loaded.owl.lazy": t.proxy(function(t) {
                t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, n.prototype.update = function() {
        var e = this._core._current,
            i = e + this._core.settings.items,
            s = this._core.$stage.children().toArray().slice(e, i),
            n = [],
            o = 0;
        t.each(s, function(e, i) {
            n.push(t(i).height())
        }), o = Math.max.apply(null, n), this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass)
    }, n.prototype.destroy = function() {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
            }, this),
            "refreshed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && "position" === t.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                if (e.namespace) {
                    var i = t(e.content).find(".owl-video");
                    i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
                }
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
            this.play(t)
        }, this))
    };
    n.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, n.prototype.fetch = function(t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
            s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
            n = t.attr("data-width") || this._core.settings.videoWidth,
            o = t.attr("data-height") || this._core.settings.videoHeight,
            r = t.attr("href");
        if (!r) throw new Error("Missing video URL.");
        if ((s = r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube";
        else if (s[3].indexOf("vimeo") > -1) i = "vimeo";
        else {
            if (!(s[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            i = "vzaar"
        }
        s = s[6], this._videos[r] = {
            type: i,
            id: s,
            width: n,
            height: o
        }, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
    }, n.prototype.thumbnail = function(e, i) {
        var s, n, o, r = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
            a = e.find("img"),
            h = "src",
            l = "",
            c = this._core.settings,
            p = function(t) {
                n = '<div class="owl-video-play-icon"></div>', s = c.lazyLoad ? '<div class="owl-video-tn ' + l + '" ' + h + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(s), e.after(n)
            };
        if (e.wrap('<div class="owl-video-wrapper"' + r + "></div>"), this._core.settings.lazyLoad && (h = "data-src", l = "owl-lazy"), a.length) return p(a.attr(h)), a.remove(), !1;
        "youtube" === i.type ? (o = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg", p(o)) : "vimeo" === i.type ? t.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                o = t[0].thumbnail_large, p(o)
            }
        }) : "vzaar" === i.type && t.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                o = t.framegrab_url, p(o)
            }
        })
    }, n.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, n.prototype.play = function(e) {
        var i, s = t(e.target).closest("." + this._core.settings.itemClass),
            n = this._videos[s.attr("data-video")],
            o = n.width || "100%",
            r = n.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), s = this._core.items(this._core.relative(s.index())), this._core.reset(s.index()), "youtube" === n.type ? i = '<iframe width="' + o + '" height="' + r + '" src="//www.youtube.com/embed/' + n.id + "?autoplay=1&rel=0&v=" + n.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === n.type ? i = '<iframe src="//player.vimeo.com/video/' + n.id + '?autoplay=1" width="' + o + '" height="' + r + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === n.type && (i = '<iframe frameborder="0"height="' + r + '"width="' + o + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + n.id + '/player?autoplay=true"></iframe>'), t('<div class="owl-video-frame">' + i + "</div>").insertAfter(s.find(".owl-video")), this._playing = s.addClass("owl-video-playing"))
    }, n.prototype.isInFullScreen = function() {
        var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return e && t(e).parent().hasClass("owl-video-frame")
    }, n.prototype.destroy = function() {
        var t, e;
        this._core.$element.off("click.owl.video");
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
            "change.owl.carousel": t.proxy(function(t) {
                t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                t.namespace && (this.swapping = "translated" == t.type)
            }, this),
            "translate.owl.carousel": t.proxy(function(t) {
                t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    n.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, n.prototype.swap = function() {
        if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
            this.core.speed(0);
            var e, i = t.proxy(this.clear, this),
                s = this.core.$stage.children().eq(this.previous),
                n = this.core.$stage.children().eq(this.next),
                o = this.core.settings.animateIn,
                r = this.core.settings.animateOut;
            this.core.current() !== this.previous && (r && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), s.one(t.support.animation.end, i).css({
                left: e + "px"
            }).addClass("animated owl-animated-out").addClass(r)), o && n.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(o))
        }
    }, n.prototype.clear = function(e) {
        t(e.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, n.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Animate = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    var n = function(e) {
        this._core = e, this._timeout = null, this._paused = !1, this._handlers = {
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
            }, this),
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": t.proxy(function(t, e, i) {
                t.namespace && this.play(e, i)
            }, this),
            "stop.owl.autoplay": t.proxy(function(t) {
                t.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": t.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, n.Defaults, this._core.options)
    };
    n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, n.prototype.play = function(t, e) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
    }, n.prototype._getNextTimeout = function(s, n) {
        return this._timeout && e.clearTimeout(this._timeout), e.setTimeout(t.proxy(function() {
            this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(n || this._core.settings.autoplaySpeed)
        }, this), s || this._core.settings.autoplayTimeout)
    }, n.prototype._setAutoPlayInterval = function() {
        this._timeout = this._getNextTimeout()
    }, n.prototype.stop = function() {
        this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"))
    }, n.prototype.pause = function() {
        this._core.is("rotating") && (this._paused = !0)
    }, n.prototype.destroy = function() {
        var t, e;
        this.stop();
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = function(e) {
        this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": t.proxy(function(e) {
                e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": t.proxy(function(t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                t.namespace && "position" == t.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": t.proxy(function(t) {
                t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": t.proxy(function(t) {
                t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    n.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, n.prototype.initialize = function() {
        var e, i = this._core.settings;
        this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function(t) {
            this.prev(i.navSpeed)
        }, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function(t) {
            this.next(i.navSpeed)
        }, this)), i.dotsData || (this._templates = [t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", t.proxy(function(e) {
            var s = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
            e.preventDefault(), this.to(s, i.dotsSpeed)
        }, this));
        for (e in this._overrides) this._core[e] = t.proxy(this[e], this)
    }, n.prototype.destroy = function() {
        var t, e, i, s;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) this._controls[e].remove();
        for (s in this.overides) this._core[s] = this._overrides[s];
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, n.prototype.update = function() {
        var t, e, i = this._core.clones().length / 2,
            s = i + this._core.items().length,
            n = this._core.maximum(!0),
            o = this._core.settings,
            r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
        if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy)
            for (this._pages = [], t = i, e = 0, 0; t < s; t++) {
                if (e >= r || 0 === e) {
                    if (this._pages.push({
                            start: Math.min(n, t - i),
                            end: t - i + r - 1
                        }), Math.min(n, t - i) === n) break;
                    e = 0, 0
                }
                e += this._core.mergers(this._core.relative(t))
            }
    }, n.prototype.draw = function() {
        var e, i = this._core.settings,
            s = this._core.items().length <= i.items,
            n = this._core.relative(this._core.current()),
            o = i.loop || i.rewind;
        this._controls.$relative.toggleClass("disabled", !i.nav || s), i.nav && (this._controls.$previous.toggleClass("disabled", !o && n <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && n >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || s), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
    }, n.prototype.onTrigger = function(e) {
        var i = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
        }
    }, n.prototype.current = function() {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, t.proxy(function(t, i) {
            return t.start <= e && t.end >= e
        }, this)).pop()
    }, n.prototype.getPosition = function(e) {
        var i, s, n = this._core.settings;
        return "page" == n.slideBy ? (i = t.inArray(this.current(), this._pages), s = this._pages.length, e ? ++i : --i, i = this._pages[(i % s + s) % s].start) : (i = this._core.relative(this._core.current()), s = this._core.items().length, e ? i += n.slideBy : i -= n.slideBy), i
    }, n.prototype.next = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }, n.prototype.prev = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }, n.prototype.to = function(e, i, s) {
        var n;
        !s && this._pages.length ? (n = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % n + n) % n].start, i)) : t.proxy(this._overrides.to, this._core)(e, i)
    }, t.fn.owlCarousel.Constructor.Plugins.Navigation = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    "use strict";
    var n = function(i) {
        this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": t.proxy(function(i) {
                i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                if (e.namespace) {
                    var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!i) return;
                    this._hashes[i] = e.content
                }
            }, this),
            "changed.owl.carousel": t.proxy(function(i) {
                if (i.namespace && "position" === i.property.name) {
                    var s = this._core.items(this._core.relative(this._core.current())),
                        n = t.map(this._hashes, function(t, e) {
                            return t === s ? e : null
                        }).join();
                    if (!n || e.location.hash.slice(1) === n) return;
                    e.location.hash = n
                }
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function(t) {
            var i = e.location.hash.substring(1),
                s = this._core.$stage.children(),
                n = this._hashes[i] && s.index(this._hashes[i]);
            void 0 !== n && n !== this._core.current() && this._core.to(this._core.relative(n), !1, !0)
        }, this))
    };
    n.Defaults = {
        URLhashListener: !1
    }, n.prototype.destroy = function() {
        var i, s;
        t(e).off("hashchange.owl.navigation");
        for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
        for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Hash = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, s) {
    function n(e, i) {
        var n = !1,
            o = e.charAt(0).toUpperCase() + e.slice(1);
        return t.each((e + " " + a.join(o + " ") + o).split(" "), function(t, e) {
            if (r[e] !== s) return n = !i || e, !1
        }), n
    }

    function o(t) {
        return n(t, !0)
    }
    var r = t("<support>").get(0).style,
        a = "Webkit Moz O ms".split(" "),
        h = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        l = {
            csstransforms: function() {
                return !!n("transform")
            },
            csstransforms3d: function() {
                return !!n("perspective")
            },
            csstransitions: function() {
                return !!n("transition")
            },
            cssanimations: function() {
                return !!n("animation")
            }
        };
    l.csstransitions() && (t.support.transition = new String(o("transition")), t.support.transition.end = h.transition.end[t.support.transition]), l.cssanimations() && (t.support.animation = new String(o("animation")), t.support.animation.end = h.animation.end[t.support.animation]), l.csstransforms() && (t.support.transform = new String(o("transform")), t.support.transform3d = l.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
! function(t, i, e, s) {
    "use strict";

    function o(i, e) {
        this.element = i, this.$context = t(i).data("api", this), this.$layers = this.$context.find(".layer");
        var s = {
            calibrateX: this.$context.data("calibrate-x") || null,
            calibrateY: this.$context.data("calibrate-y") || null,
            invertX: this.$context.data("invert-x") || null,
            invertY: this.$context.data("invert-y") || null,
            limitX: parseFloat(this.$context.data("limit-x")) || null,
            limitY: parseFloat(this.$context.data("limit-y")) || null,
            scalarX: parseFloat(this.$context.data("scalar-x")) || null,
            scalarY: parseFloat(this.$context.data("scalar-y")) || null,
            frictionX: parseFloat(this.$context.data("friction-x")) || null,
            frictionY: parseFloat(this.$context.data("friction-y")) || null,
            originX: parseFloat(this.$context.data("origin-x")) || null,
            originY: parseFloat(this.$context.data("origin-y")) || null
        };
        for (var o in s) null === s[o] && delete s[o];
        t.extend(this, a, e, s), this.calibrationTimer = null, this.calibrationFlag = !0, this.enabled = !1, this.depths = [], this.raf = null, this.bounds = null, this.ex = 0, this.ey = 0, this.ew = 0, this.eh = 0, this.ecx = 0, this.ecy = 0, this.erx = 0, this.ery = 0, this.cx = 0, this.cy = 0, this.ix = 0, this.iy = 0, this.mx = 0, this.my = 0, this.vx = 0, this.vy = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onDeviceOrientation = this.onDeviceOrientation.bind(this), this.onOrientationTimer = this.onOrientationTimer.bind(this), this.onCalibrationTimer = this.onCalibrationTimer.bind(this), this.onAnimationFrame = this.onAnimationFrame.bind(this), this.onWindowResize = this.onWindowResize.bind(this), this.initialise()
    }
    var n = "parallax",
        a = {
            relativeInput: !1,
            clipRelativeInput: !1,
            calibrationThreshold: 100,
            calibrationDelay: 500,
            supportDelay: 500,
            calibrateX: !1,
            calibrateY: !0,
            invertX: !0,
            invertY: !0,
            limitX: !1,
            limitY: !1,
            scalarX: 10,
            scalarY: 10,
            frictionX: .1,
            frictionY: .1,
            originX: .5,
            originY: .5
        };
    o.prototype.transformSupport = function(t) {
        for (var o = e.createElement("div"), n = !1, a = null, r = !1, h = null, l = null, c = 0, p = this.vendors.length; p > c; c++)
            if (null !== this.vendors[c] ? (h = this.vendors[c][0] + "transform", l = this.vendors[c][1] + "Transform") : (h = "transform", l = "transform"), o.style[l] !== s) {
                n = !0;
                break
            } switch (t) {
            case "2D":
                r = n;
                break;
            case "3D":
                if (n) {
                    var m = e.body || e.createElement("body"),
                        u = e.documentElement,
                        y = u.style.overflow;
                    e.body || (u.style.overflow = "hidden", u.appendChild(m), m.style.overflow = "hidden", m.style.background = ""), m.appendChild(o), o.style[l] = "translate3d(1px,1px,1px)", r = (a = i.getComputedStyle(o).getPropertyValue(h)) !== s && a.length > 0 && "none" !== a, u.style.overflow = y, m.removeChild(o)
                }
        }
        return r
    }, o.prototype.ww = null, o.prototype.wh = null, o.prototype.wcx = null, o.prototype.wcy = null, o.prototype.wrx = null, o.prototype.wry = null, o.prototype.portrait = null, o.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), o.prototype.vendors = [null, ["-webkit-", "webkit"],
        ["-moz-", "Moz"],
        ["-o-", "O"],
        ["-ms-", "ms"]
    ], o.prototype.motionSupport = !!i.DeviceMotionEvent, o.prototype.orientationSupport = !!i.DeviceOrientationEvent, o.prototype.orientationStatus = 0, o.prototype.transform2DSupport = o.prototype.transformSupport("2D"), o.prototype.transform3DSupport = o.prototype.transformSupport("3D"), o.prototype.propertyCache = {}, o.prototype.initialise = function() {
        "static" === this.$context.css("position") && this.$context.css({
            position: "relative"
        }), this.accelerate(this.$context), this.updateLayers(), this.updateDimensions(), this.enable(), this.queueCalibration(this.calibrationDelay)
    }, o.prototype.updateLayers = function() {
        this.$layers = this.$context.find(".layer"), this.depths = [], this.$layers.css({
            position: "absolute",
            display: "block",
            left: 0,
            top: 0
        }), this.$layers.first().css({
            position: "relative"
        }), this.accelerate(this.$layers), this.$layers.each(t.proxy(function(i, e) {
            this.depths.push(t(e).data("depth") || 0)
        }, this))
    }, o.prototype.updateDimensions = function() {
        this.ww = i.innerWidth, this.wh = i.innerHeight, this.wcx = this.ww * this.originX, this.wcy = this.wh * this.originY, this.wrx = Math.max(this.wcx, this.ww - this.wcx), this.wry = Math.max(this.wcy, this.wh - this.wcy)
    }, o.prototype.updateBounds = function() {
        this.bounds = this.element.getBoundingClientRect(), this.ex = this.bounds.left, this.ey = this.bounds.top, this.ew = this.bounds.width, this.eh = this.bounds.height, this.ecx = this.ew * this.originX, this.ecy = this.eh * this.originY, this.erx = Math.max(this.ecx, this.ew - this.ecx), this.ery = Math.max(this.ecy, this.eh - this.ecy)
    }, o.prototype.queueCalibration = function(t) {
        clearTimeout(this.calibrationTimer), this.calibrationTimer = setTimeout(this.onCalibrationTimer, t)
    }, o.prototype.enable = function() {
        this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, this.$context.attr("data-mode", "orientation"), i.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0, this.cy = 0, this.portrait = !1, this.$context.attr("data-mode", "cursor"), i.addEventListener("mousemove", this.onMouseMove)), i.addEventListener("resize", this.onWindowResize), this.raf = requestAnimationFrame(this.onAnimationFrame))
    }, o.prototype.disable = function() {
        this.enabled && (this.enabled = !1, this.orientationSupport ? i.removeEventListener("deviceorientation", this.onDeviceOrientation) : i.removeEventListener("mousemove", this.onMouseMove), i.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf))
    }, o.prototype.calibrate = function(t, i) {
        this.calibrateX = t === s ? this.calibrateX : t, this.calibrateY = i === s ? this.calibrateY : i
    }, o.prototype.invert = function(t, i) {
        this.invertX = t === s ? this.invertX : t, this.invertY = i === s ? this.invertY : i
    }, o.prototype.friction = function(t, i) {
        this.frictionX = t === s ? this.frictionX : t, this.frictionY = i === s ? this.frictionY : i
    }, o.prototype.scalar = function(t, i) {
        this.scalarX = t === s ? this.scalarX : t, this.scalarY = i === s ? this.scalarY : i
    }, o.prototype.limit = function(t, i) {
        this.limitX = t === s ? this.limitX : t, this.limitY = i === s ? this.limitY : i
    }, o.prototype.origin = function(t, i) {
        this.originX = t === s ? this.originX : t, this.originY = i === s ? this.originY : i
    }, o.prototype.clamp = function(t, i, e) {
        return t = Math.max(t, i), t = Math.min(t, e)
    }, o.prototype.css = function(i, e, o) {
        var n = this.propertyCache[e];
        if (!n)
            for (var a = 0, r = this.vendors.length; r > a; a++)
                if (n = null !== this.vendors[a] ? t.camelCase(this.vendors[a][1] + "-" + e) : e, i.style[n] !== s) {
                    this.propertyCache[e] = n;
                    break
                } i.style[n] = o
    }, o.prototype.accelerate = function(t) {
        for (var i = 0, e = t.length; e > i; i++) {
            var s = t[i];
            this.css(s, "transform", "translate3d(0,0,0)"), this.css(s, "transform-style", "preserve-3d"), this.css(s, "backface-visibility", "hidden")
        }
    }, o.prototype.setPosition = function(t, i, e) {
        i += "px", e += "px", this.transform3DSupport ? this.css(t, "transform", "translate3d(" + i + "," + e + ",0)") : this.transform2DSupport ? this.css(t, "transform", "translate(" + i + "," + e + ")") : (t.style.left = i, t.style.top = e)
    }, o.prototype.onOrientationTimer = function() {
        this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, this.enable())
    }, o.prototype.onCalibrationTimer = function() {
        this.calibrationFlag = !0
    }, o.prototype.onWindowResize = function() {
        this.updateDimensions()
    }, o.prototype.onAnimationFrame = function() {
        this.updateBounds();
        var t = this.ix - this.cx,
            i = this.iy - this.cy;
        (Math.abs(t) > this.calibrationThreshold || Math.abs(i) > this.calibrationThreshold) && this.queueCalibration(0), this.portrait ? (this.mx = this.calibrateX ? i : this.iy, this.my = this.calibrateY ? t : this.ix) : (this.mx = this.calibrateX ? t : this.ix, this.my = this.calibrateY ? i : this.iy), this.mx *= this.ew * (this.scalarX / 100), this.my *= this.eh * (this.scalarY / 100), isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)), isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)), this.vx += (this.mx - this.vx) * this.frictionX, this.vy += (this.my - this.vy) * this.frictionY;
        for (var e = 0, s = this.$layers.length; s > e; e++) {
            var o = this.depths[e],
                n = this.$layers[e],
                a = this.vx * o * (this.invertX ? -1 : 1),
                r = this.vy * o * (this.invertY ? -1 : 1);
            this.setPosition(n, a, r)
        }
        this.raf = requestAnimationFrame(this.onAnimationFrame)
    }, o.prototype.onDeviceOrientation = function(t) {
        if (!this.desktop && null !== t.beta && null !== t.gamma) {
            this.orientationStatus = 1;
            var e = (t.beta || 0) / 30,
                s = (t.gamma || 0) / 30,
                o = i.innerHeight > i.innerWidth;
            this.portrait !== o && (this.portrait = o, this.calibrationFlag = !0), this.calibrationFlag && (this.calibrationFlag = !1, this.cx = e, this.cy = s), this.ix = e, this.iy = s
        }
    }, o.prototype.onMouseMove = function(t) {
        var i = t.clientX,
            e = t.clientY;
        !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (i = Math.max(i, this.ex), i = Math.min(i, this.ex + this.ew), e = Math.max(e, this.ey), e = Math.min(e, this.ey + this.eh)), this.ix = (i - this.ex - this.ecx) / this.erx, this.iy = (e - this.ey - this.ecy) / this.ery) : (this.ix = (i - this.wcx) / this.wrx, this.iy = (e - this.wcy) / this.wry)
    };
    var r = {
        enable: o.prototype.enable,
        disable: o.prototype.disable,
        updateLayers: o.prototype.updateLayers,
        calibrate: o.prototype.calibrate,
        friction: o.prototype.friction,
        invert: o.prototype.invert,
        scalar: o.prototype.scalar,
        limit: o.prototype.limit,
        origin: o.prototype.origin
    };
    t.fn[n] = function(i) {
        var e = arguments;
        return this.each(function() {
            var s = t(this),
                a = s.data(n);
            a || (a = new o(this, i), s.data(n, a)), r[i] && a[i].apply(a, Array.prototype.slice.call(e, 1))
        })
    }
}(window.jQuery || window.Zepto, window, document),
function() {
    for (var t = 0, i = ["ms", "moz", "webkit", "o"], e = 0; e < i.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[i[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i[e] + "CancelAnimationFrame"] || window[i[e] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(i) {
        var e = (new Date).getTime(),
            s = Math.max(0, 16 - (e - t)),
            o = window.setTimeout(function() {
                i(e + s)
            }, s);
        return t = e + s, o
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
        clearTimeout(t)
    })
}();
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function(e) {
    var t = function() {
            if (e && e.fn && e.fn.select2 && e.fn.select2.amd) t = e.fn.select2.amd;
            var t;
            return function() {
                    if (!t || !t.requirejs) {
                        t ? n = t : t = {};
                        var e, n, i;
                        ! function(t) {
                            function o(e, t) {
                                return w.call(e, t)
                            }

                            function r(e, t) {
                                var n, i, o, r, s, a, l, c, u, d, p, h = t && t.split("/"),
                                    f = y.map,
                                    g = f && f["*"] || {};
                                if (e && "." === e.charAt(0))
                                    if (t) {
                                        for (s = (e = e.split("/")).length - 1, y.nodeIdCompat && b.test(e[s]) && (e[s] = e[s].replace(b, "")), e = h.slice(0, h.length - 1).concat(e), u = 0; u < e.length; u += 1)
                                            if ("." === (p = e[u])) e.splice(u, 1), u -= 1;
                                            else if (".." === p) {
                                            if (1 === u && (".." === e[2] || ".." === e[0])) break;
                                            u > 0 && (e.splice(u - 1, 2), u -= 2)
                                        }
                                        e = e.join("/")
                                    } else 0 === e.indexOf("./") && (e = e.substring(2));
                                if ((h || g) && f) {
                                    for (u = (n = e.split("/")).length; u > 0; u -= 1) {
                                        if (i = n.slice(0, u).join("/"), h)
                                            for (d = h.length; d > 0; d -= 1)
                                                if ((o = f[h.slice(0, d).join("/")]) && (o = o[i])) {
                                                    r = o, a = u;
                                                    break
                                                } if (r) break;
                                        !l && g && g[i] && (l = g[i], c = u)
                                    }!r && l && (r = l, a = c), r && (n.splice(0, a, r), e = n.join("/"))
                                }
                                return e
                            }

                            function s(e, n) {
                                return function() {
                                    var i = $.call(arguments, 0);
                                    return "string" != typeof i[0] && 1 === i.length && i.push(null), h.apply(t, i.concat([e, n]))
                                }
                            }

                            function a(e) {
                                return function(t) {
                                    return r(t, e)
                                }
                            }

                            function l(e) {
                                return function(t) {
                                    m[e] = t
                                }
                            }

                            function c(e) {
                                if (o(v, e)) {
                                    var n = v[e];
                                    delete v[e], _[e] = !0, p.apply(t, n)
                                }
                                if (!o(m, e) && !o(_, e)) throw new Error("No " + e);
                                return m[e]
                            }

                            function u(e) {
                                var t, n = e ? e.indexOf("!") : -1;
                                return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
                            }

                            function d(e) {
                                return function() {
                                    return y && y.config && y.config[e] || {}
                                }
                            }
                            var p, h, f, g, m = {},
                                v = {},
                                y = {},
                                _ = {},
                                w = Object.prototype.hasOwnProperty,
                                $ = [].slice,
                                b = /\.js$/;
                            f = function(e, t) {
                                var n, i = u(e),
                                    o = i[0];
                                return e = i[1], o && (o = r(o, t), n = c(o)), o ? e = n && n.normalize ? n.normalize(e, a(t)) : r(e, t) : (e = r(e, t), i = u(e), o = i[0], e = i[1], o && (n = c(o))), {
                                    f: o ? o + "!" + e : e,
                                    n: e,
                                    pr: o,
                                    p: n
                                }
                            }, g = {
                                require: function(e) {
                                    return s(e)
                                },
                                exports: function(e) {
                                    var t = m[e];
                                    return void 0 !== t ? t : m[e] = {}
                                },
                                module: function(e) {
                                    return {
                                        id: e,
                                        uri: "",
                                        exports: m[e],
                                        config: d(e)
                                    }
                                }
                            }, p = function(e, n, i, r) {
                                var a, u, d, p, h, y, w = [],
                                    $ = typeof i;
                                if (r = r || e, "undefined" === $ || "function" === $) {
                                    for (n = !n.length && i.length ? ["require", "exports", "module"] : n, h = 0; h < n.length; h += 1)
                                        if (p = f(n[h], r), "require" === (u = p.f)) w[h] = g.require(e);
                                        else if ("exports" === u) w[h] = g.exports(e), y = !0;
                                    else if ("module" === u) a = w[h] = g.module(e);
                                    else if (o(m, u) || o(v, u) || o(_, u)) w[h] = c(u);
                                    else {
                                        if (!p.p) throw new Error(e + " missing " + u);
                                        p.p.load(p.n, s(r, !0), l(u), {}), w[h] = m[u]
                                    }
                                    d = i ? i.apply(m[e], w) : void 0, e && (a && a.exports !== t && a.exports !== m[e] ? m[e] = a.exports : d === t && y || (m[e] = d))
                                } else e && (m[e] = i)
                            }, e = n = h = function(e, n, i, o, r) {
                                if ("string" == typeof e) return g[e] ? g[e](n) : c(f(e, n).f);
                                if (!e.splice) {
                                    if ((y = e).deps && h(y.deps, y.callback), !n) return;
                                    n.splice ? (e = n, n = i, i = null) : e = t
                                }
                                return n = n || function() {}, "function" == typeof i && (i = o, o = r), o ? p(t, e, n, i) : setTimeout(function() {
                                    p(t, e, n, i)
                                }, 4), h
                            }, h.config = function(e) {
                                return h(e)
                            }, e._defined = m, (i = function(e, t, n) {
                                if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
                                t.splice || (n = t, t = []), o(m, e) || o(v, e) || (v[e] = [e, t, n])
                            }).amd = {
                                jQuery: !0
                            }
                        }(), t.requirejs = e, t.require = n, t.define = i
                    }
                }(), t.define("almond", function() {}), t.define("jquery", [], function() {
                    var t = e || $;
                    return null == t && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), t
                }), t.define("select2/utils", ["jquery"], function(e) {
                    function t(e) {
                        var t = e.prototype,
                            n = [];
                        for (var i in t) "function" == typeof t[i] && "constructor" !== i && n.push(i);
                        return n
                    }
                    var n = {};
                    n.Extend = function(e, t) {
                        function n() {
                            this.constructor = e
                        }
                        var i = {}.hasOwnProperty;
                        for (var o in t) i.call(t, o) && (e[o] = t[o]);
                        return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
                    }, n.Decorate = function(e, n) {
                        function i() {
                            var t = Array.prototype.unshift,
                                i = n.prototype.constructor.length,
                                o = e.prototype.constructor;
                            i > 0 && (t.call(arguments, e.prototype.constructor), o = n.prototype.constructor), o.apply(this, arguments)
                        }
                        var o = t(n),
                            r = t(e);
                        n.displayName = e.displayName, i.prototype = new function() {
                            this.constructor = i
                        };
                        for (var s = 0; s < r.length; s++) {
                            var a = r[s];
                            i.prototype[a] = e.prototype[a]
                        }
                        for (var l = 0; l < o.length; l++) {
                            var c = o[l];
                            i.prototype[c] = function(e) {
                                var t = function() {};
                                e in i.prototype && (t = i.prototype[e]);
                                var o = n.prototype[e];
                                return function() {
                                    return Array.prototype.unshift.call(arguments, t), o.apply(this, arguments)
                                }
                            }(c)
                        }
                        return i
                    };
                    var i = function() {
                        this.listeners = {}
                    };
                    return i.prototype.on = function(e, t) {
                        this.listeners = this.listeners || {}, e in this.listeners ? this.listeners[e].push(t) : this.listeners[e] = [t]
                    }, i.prototype.trigger = function(e) {
                        var t = Array.prototype.slice,
                            n = t.call(arguments, 1);
                        this.listeners = this.listeners || {}, null == n && (n = []), 0 === n.length && n.push({}), n[0]._type = e, e in this.listeners && this.invoke(this.listeners[e], t.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
                    }, i.prototype.invoke = function(e, t) {
                        for (var n = 0, i = e.length; i > n; n++) e[n].apply(this, t)
                    }, n.Observable = i, n.generateChars = function(e) {
                        for (var t = "", n = 0; e > n; n++) t += Math.floor(36 * Math.random()).toString(36);
                        return t
                    }, n.bind = function(e, t) {
                        return function() {
                            e.apply(t, arguments)
                        }
                    }, n._convertData = function(e) {
                        for (var t in e) {
                            var n = t.split("-"),
                                i = e;
                            if (1 !== n.length) {
                                for (var o = 0; o < n.length; o++) {
                                    var r = n[o];
                                    (r = r.substring(0, 1).toLowerCase() + r.substring(1)) in i || (i[r] = {}), o == n.length - 1 && (i[r] = e[t]), i = i[r]
                                }
                                delete e[t]
                            }
                        }
                        return e
                    }, n.hasScroll = function(t, n) {
                        var i = e(n),
                            o = n.style.overflowX,
                            r = n.style.overflowY;
                        return (o !== r || "hidden" !== r && "visible" !== r) && ("scroll" === o || "scroll" === r || (i.innerHeight() < n.scrollHeight || i.innerWidth() < n.scrollWidth))
                    }, n.escapeMarkup = function(e) {
                        var t = {
                            "\\": "&#92;",
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#39;",
                            "/": "&#47;"
                        };
                        return "string" != typeof e ? e : String(e).replace(/[&<>"'\/\\]/g, function(e) {
                            return t[e]
                        })
                    }, n.appendMany = function(t, n) {
                        if ("1.7" === e.fn.jquery.substr(0, 3)) {
                            var i = e();
                            e.map(n, function(e) {
                                i = i.add(e)
                            }), n = i
                        }
                        t.append(n)
                    }, n
                }), t.define("select2/results", ["jquery", "./utils"], function(e, t) {
                    function n(e, t, i) {
                        this.$element = e, this.data = i, this.options = t, n.__super__.constructor.call(this)
                    }
                    return t.Extend(n, t.Observable), n.prototype.render = function() {
                        var t = e('<ul class="select2-results__options" role="tree"></ul>');
                        return this.options.get("multiple") && t.attr("aria-multiselectable", "true"), this.$results = t, t
                    }, n.prototype.clear = function() {
                        this.$results.empty()
                    }, n.prototype.displayMessage = function(t) {
                        var n = this.options.get("escapeMarkup");
                        this.clear(), this.hideLoading();
                        var i = e('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                            o = this.options.get("translations").get(t.message);
                        i.append(n(o(t.args))), i[0].className += " select2-results__message", this.$results.append(i)
                    }, n.prototype.hideMessages = function() {
                        this.$results.find(".select2-results__message").remove()
                    }, n.prototype.append = function(e) {
                        this.hideLoading();
                        var t = [];
                        if (null != e.results && 0 !== e.results.length) {
                            e.results = this.sort(e.results);
                            for (var n = 0; n < e.results.length; n++) {
                                var i = e.results[n],
                                    o = this.option(i);
                                t.push(o)
                            }
                            this.$results.append(t)
                        } else 0 === this.$results.children().length && this.trigger("results:message", {
                            message: "noResults"
                        })
                    }, n.prototype.position = function(e, t) {
                        t.find(".select2-results").append(e)
                    }, n.prototype.sort = function(e) {
                        return this.options.get("sorter")(e)
                    }, n.prototype.highlightFirstItem = function() {
                        var e = this.$results.find(".select2-results__option[aria-selected]"),
                            t = e.filter("[aria-selected=true]");
                        t.length > 0 ? t.first().trigger("mouseenter") : e.first().trigger("mouseenter"), this.ensureHighlightVisible()
                    }, n.prototype.setClasses = function() {
                        var t = this;
                        this.data.current(function(n) {
                            var i = e.map(n, function(e) {
                                return e.id.toString()
                            });
                            t.$results.find(".select2-results__option[aria-selected]").each(function() {
                                var t = e(this),
                                    n = e.data(this, "data"),
                                    o = "" + n.id;
                                null != n.element && n.element.selected || null == n.element && e.inArray(o, i) > -1 ? t.attr("aria-selected", "true") : t.attr("aria-selected", "false")
                            })
                        })
                    }, n.prototype.showLoading = function(e) {
                        this.hideLoading();
                        var t = {
                                disabled: !0,
                                loading: !0,
                                text: this.options.get("translations").get("searching")(e)
                            },
                            n = this.option(t);
                        n.className += " loading-results", this.$results.prepend(n)
                    }, n.prototype.hideLoading = function() {
                        this.$results.find(".loading-results").remove()
                    }, n.prototype.option = function(t) {
                        var n = document.createElement("li");
                        n.className = "select2-results__option";
                        var i = {
                            role: "treeitem",
                            "aria-selected": "false"
                        };
                        t.disabled && (delete i["aria-selected"], i["aria-disabled"] = "true"), null == t.id && delete i["aria-selected"], null != t._resultId && (n.id = t._resultId), t.title && (n.title = t.title), t.children && (i.role = "group", i["aria-label"] = t.text, delete i["aria-selected"]);
                        for (var o in i) {
                            var r = i[o];
                            n.setAttribute(o, r)
                        }
                        if (t.children) {
                            var s = e(n),
                                a = document.createElement("strong");
                            a.className = "select2-results__group", e(a), this.template(t, a);
                            for (var l = [], c = 0; c < t.children.length; c++) {
                                var u = t.children[c],
                                    d = this.option(u);
                                l.push(d)
                            }
                            var p = e("<ul></ul>", {
                                class: "select2-results__options select2-results__options--nested"
                            });
                            p.append(l), s.append(a), s.append(p)
                        } else this.template(t, n);
                        return e.data(n, "data", t), n
                    }, n.prototype.bind = function(t, n) {
                        var i = this,
                            o = t.id + "-results";
                        this.$results.attr("id", o), t.on("results:all", function(e) {
                            i.clear(), i.append(e.data), t.isOpen() && (i.setClasses(), i.highlightFirstItem())
                        }), t.on("results:append", function(e) {
                            i.append(e.data), t.isOpen() && i.setClasses()
                        }), t.on("query", function(e) {
                            i.hideMessages(), i.showLoading(e)
                        }), t.on("select", function() {
                            t.isOpen() && (i.setClasses(), i.highlightFirstItem())
                        }), t.on("unselect", function() {
                            t.isOpen() && (i.setClasses(), i.highlightFirstItem())
                        }), t.on("open", function() {
                            i.$results.attr("aria-expanded", "true"), i.$results.attr("aria-hidden", "false"), i.setClasses(), i.ensureHighlightVisible()
                        }), t.on("close", function() {
                            i.$results.attr("aria-expanded", "false"), i.$results.attr("aria-hidden", "true"), i.$results.removeAttr("aria-activedescendant")
                        }), t.on("results:toggle", function() {
                            var e = i.getHighlightedResults();
                            0 !== e.length && e.trigger("mouseup")
                        }), t.on("results:select", function() {
                            var e = i.getHighlightedResults();
                            if (0 !== e.length) {
                                var t = e.data("data");
                                "true" == e.attr("aria-selected") ? i.trigger("close", {}) : i.trigger("select", {
                                    data: t
                                })
                            }
                        }), t.on("results:previous", function() {
                            var e = i.getHighlightedResults(),
                                t = i.$results.find("[aria-selected]"),
                                n = t.index(e);
                            if (0 !== n) {
                                var o = n - 1;
                                0 === e.length && (o = 0);
                                var r = t.eq(o);
                                r.trigger("mouseenter");
                                var s = i.$results.offset().top,
                                    a = r.offset().top,
                                    l = i.$results.scrollTop() + (a - s);
                                0 === o ? i.$results.scrollTop(0) : 0 > a - s && i.$results.scrollTop(l)
                            }
                        }), t.on("results:next", function() {
                            var e = i.getHighlightedResults(),
                                t = i.$results.find("[aria-selected]"),
                                n = t.index(e) + 1;
                            if (!(n >= t.length)) {
                                var o = t.eq(n);
                                o.trigger("mouseenter");
                                var r = i.$results.offset().top + i.$results.outerHeight(!1),
                                    s = o.offset().top + o.outerHeight(!1),
                                    a = i.$results.scrollTop() + s - r;
                                0 === n ? i.$results.scrollTop(0) : s > r && i.$results.scrollTop(a)
                            }
                        }), t.on("results:focus", function(e) {
                            e.element.addClass("select2-results__option--highlighted")
                        }), t.on("results:message", function(e) {
                            i.displayMessage(e)
                        }), e.fn.mousewheel && this.$results.on("mousewheel", function(e) {
                            var t = i.$results.scrollTop(),
                                n = i.$results.get(0).scrollHeight - t + e.deltaY,
                                o = e.deltaY > 0 && t - e.deltaY <= 0,
                                r = e.deltaY < 0 && n <= i.$results.height();
                            o ? (i.$results.scrollTop(0), e.preventDefault(), e.stopPropagation()) : r && (i.$results.scrollTop(i.$results.get(0).scrollHeight - i.$results.height()), e.preventDefault(), e.stopPropagation())
                        }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function(t) {
                            var n = e(this),
                                o = n.data("data");
                            return "true" === n.attr("aria-selected") ? void(i.options.get("multiple") ? i.trigger("unselect", {
                                originalEvent: t,
                                data: o
                            }) : i.trigger("close", {})) : void i.trigger("select", {
                                originalEvent: t,
                                data: o
                            })
                        }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function(t) {
                            var n = e(this).data("data");
                            i.getHighlightedResults().removeClass("select2-results__option--highlighted"), i.trigger("results:focus", {
                                data: n,
                                element: e(this)
                            })
                        })
                    }, n.prototype.getHighlightedResults = function() {
                        return this.$results.find(".select2-results__option--highlighted")
                    }, n.prototype.destroy = function() {
                        this.$results.remove()
                    }, n.prototype.ensureHighlightVisible = function() {
                        var e = this.getHighlightedResults();
                        if (0 !== e.length) {
                            var t = this.$results.find("[aria-selected]").index(e),
                                n = this.$results.offset().top,
                                i = e.offset().top,
                                o = this.$results.scrollTop() + (i - n),
                                r = i - n;
                            o -= 2 * e.outerHeight(!1), 2 >= t ? this.$results.scrollTop(0) : (r > this.$results.outerHeight() || 0 > r) && this.$results.scrollTop(o)
                        }
                    }, n.prototype.template = function(t, n) {
                        var i = this.options.get("templateResult"),
                            o = this.options.get("escapeMarkup"),
                            r = i(t, n);
                        null == r ? n.style.display = "none" : "string" == typeof r ? n.innerHTML = o(r) : e(n).append(r)
                    }, n
                }), t.define("select2/keys", [], function() {
                    return {
                        BACKSPACE: 8,
                        TAB: 9,
                        ENTER: 13,
                        SHIFT: 16,
                        CTRL: 17,
                        ALT: 18,
                        ESC: 27,
                        SPACE: 32,
                        PAGE_UP: 33,
                        PAGE_DOWN: 34,
                        END: 35,
                        HOME: 36,
                        LEFT: 37,
                        UP: 38,
                        RIGHT: 39,
                        DOWN: 40,
                        DELETE: 46
                    }
                }), t.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(e, t, n) {
                    function i(e, t) {
                        this.$element = e, this.options = t, i.__super__.constructor.call(this)
                    }
                    return t.Extend(i, t.Observable), i.prototype.render = function() {
                        var t = e('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                        return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), t.attr("title", this.$element.attr("title")), t.attr("tabindex", this._tabindex), this.$selection = t, t
                    }, i.prototype.bind = function(e, t) {
                        var i = this,
                            o = (e.id, e.id + "-results");
                        this.container = e, this.$selection.on("focus", function(e) {
                            i.trigger("focus", e)
                        }), this.$selection.on("blur", function(e) {
                            i._handleBlur(e)
                        }), this.$selection.on("keydown", function(e) {
                            i.trigger("keypress", e), e.which === n.SPACE && e.preventDefault()
                        }), e.on("results:focus", function(e) {
                            i.$selection.attr("aria-activedescendant", e.data._resultId)
                        }), e.on("selection:update", function(e) {
                            i.update(e.data)
                        }), e.on("open", function() {
                            i.$selection.attr("aria-expanded", "true"), i.$selection.attr("aria-owns", o), i._attachCloseHandler(e)
                        }), e.on("close", function() {
                            i.$selection.attr("aria-expanded", "false"), i.$selection.removeAttr("aria-activedescendant"), i.$selection.removeAttr("aria-owns"), i.$selection.focus(), i._detachCloseHandler(e)
                        }), e.on("enable", function() {
                            i.$selection.attr("tabindex", i._tabindex)
                        }), e.on("disable", function() {
                            i.$selection.attr("tabindex", "-1")
                        })
                    }, i.prototype._handleBlur = function(t) {
                        var n = this;
                        window.setTimeout(function() {
                            document.activeElement == n.$selection[0] || e.contains(n.$selection[0], document.activeElement) || n.trigger("blur", t)
                        }, 1)
                    }, i.prototype._attachCloseHandler = function(t) {
                        e(document.body).on("mousedown.select2." + t.id, function(t) {
                            var n = e(t.target).closest(".select2");
                            e(".select2.select2-container--open").each(function() {
                                var t = e(this);
                                this != n[0] && t.data("element").select2("close")
                            })
                        })
                    }, i.prototype._detachCloseHandler = function(t) {
                        e(document.body).off("mousedown.select2." + t.id)
                    }, i.prototype.position = function(e, t) {
                        t.find(".selection").append(e)
                    }, i.prototype.destroy = function() {
                        this._detachCloseHandler(this.container)
                    }, i.prototype.update = function(e) {
                        throw new Error("The `update` method must be defined in child classes.")
                    }, i
                }), t.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(e, t, n, i) {
                    function o() {
                        o.__super__.constructor.apply(this, arguments)
                    }
                    return n.Extend(o, t), o.prototype.render = function() {
                        var e = o.__super__.render.call(this);
                        return e.addClass("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e
                    }, o.prototype.bind = function(e, t) {
                        var n = this;
                        o.__super__.bind.apply(this, arguments);
                        var i = e.id + "-container";
                        this.$selection.find(".select2-selection__rendered").attr("id", i), this.$selection.attr("aria-labelledby", i), this.$selection.on("mousedown", function(e) {
                            1 === e.which && n.trigger("toggle", {
                                originalEvent: e
                            })
                        }), this.$selection.on("focus", function(e) {}), this.$selection.on("blur", function(e) {}), e.on("focus", function(t) {
                            e.isOpen() || n.$selection.focus()
                        }), e.on("selection:update", function(e) {
                            n.update(e.data)
                        })
                    }, o.prototype.clear = function() {
                        this.$selection.find(".select2-selection__rendered").empty()
                    }, o.prototype.display = function(e, t) {
                        var n = this.options.get("templateSelection");
                        return this.options.get("escapeMarkup")(n(e, t))
                    }, o.prototype.selectionContainer = function() {
                        return e("<span></span>")
                    }, o.prototype.update = function(e) {
                        if (0 !== e.length) {
                            var t = e[0],
                                n = this.$selection.find(".select2-selection__rendered"),
                                i = this.display(t, n);
                            n.empty().append(i), n.prop("title", t.title || t.text)
                        } else this.clear()
                    }, o
                }), t.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(e, t, n) {
                    function i(e, t) {
                        i.__super__.constructor.apply(this, arguments)
                    }
                    return n.Extend(i, t), i.prototype.render = function() {
                        var e = i.__super__.render.call(this);
                        return e.addClass("select2-selection--multiple"), e.html('<ul class="select2-selection__rendered"></ul>'), e
                    }, i.prototype.bind = function(t, n) {
                        var o = this;
                        i.__super__.bind.apply(this, arguments), this.$selection.on("click", function(e) {
                            o.trigger("toggle", {
                                originalEvent: e
                            })
                        }), this.$selection.on("click", ".select2-selection__choice__remove", function(t) {
                            if (!o.options.get("disabled")) {
                                var n = e(this).parent().data("data");
                                o.trigger("unselect", {
                                    originalEvent: t,
                                    data: n
                                })
                            }
                        })
                    }, i.prototype.clear = function() {
                        this.$selection.find(".select2-selection__rendered").empty()
                    }, i.prototype.display = function(e, t) {
                        var n = this.options.get("templateSelection");
                        return this.options.get("escapeMarkup")(n(e, t))
                    }, i.prototype.selectionContainer = function() {
                        return e('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>')
                    }, i.prototype.update = function(e) {
                        if (this.clear(), 0 !== e.length) {
                            for (var t = [], i = 0; i < e.length; i++) {
                                var o = e[i],
                                    r = this.selectionContainer(),
                                    s = this.display(o, r);
                                r.append(s), r.prop("title", o.title || o.text), r.data("data", o), t.push(r)
                            }
                            var a = this.$selection.find(".select2-selection__rendered");
                            n.appendMany(a, t)
                        }
                    }, i
                }), t.define("select2/selection/placeholder", ["../utils"], function(e) {
                    function t(e, t, n) {
                        this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n)
                    }
                    return t.prototype.normalizePlaceholder = function(e, t) {
                        return "string" == typeof t && (t = {
                            id: "",
                            text: t
                        }), t
                    }, t.prototype.createPlaceholder = function(e, t) {
                        var n = this.selectionContainer();
                        return n.html(this.display(t)), n.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), n
                    }, t.prototype.update = function(e, t) {
                        var n = 1 == t.length && t[0].id != this.placeholder.id;
                        if (t.length > 1 || n) return e.call(this, t);
                        this.clear();
                        var i = this.createPlaceholder(this.placeholder);
                        this.$selection.find(".select2-selection__rendered").append(i)
                    }, t
                }), t.define("select2/selection/allowClear", ["jquery", "../keys"], function(e, t) {
                    function n() {}
                    return n.prototype.bind = function(e, t, n) {
                        var i = this;
                        e.call(this, t, n), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function(e) {
                            i._handleClear(e)
                        }), t.on("keypress", function(e) {
                            i._handleKeyboardClear(e, t)
                        })
                    }, n.prototype._handleClear = function(e, t) {
                        if (!this.options.get("disabled")) {
                            var n = this.$selection.find(".select2-selection__clear");
                            if (0 !== n.length) {
                                t.stopPropagation();
                                for (var i = n.data("data"), o = 0; o < i.length; o++) {
                                    var r = {
                                        data: i[o]
                                    };
                                    if (this.trigger("unselect", r), r.prevented) return
                                }
                                this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {})
                            }
                        }
                    }, n.prototype._handleKeyboardClear = function(e, n, i) {
                        i.isOpen() || (n.which == t.DELETE || n.which == t.BACKSPACE) && this._handleClear(n)
                    }, n.prototype.update = function(t, n) {
                        if (t.call(this, n), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === n.length)) {
                            var i = e('<span class="select2-selection__clear">&times;</span>');
                            i.data("data", n), this.$selection.find(".select2-selection__rendered").prepend(i)
                        }
                    }, n
                }), t.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(e, t, n) {
                    function i(e, t, n) {
                        e.call(this, t, n)
                    }
                    return i.prototype.render = function(t) {
                        var n = e('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');
                        this.$searchContainer = n, this.$search = n.find("input");
                        var i = t.call(this);
                        return this._transferTabIndex(), i
                    }, i.prototype.bind = function(e, t, i) {
                        var o = this;
                        e.call(this, t, i), t.on("open", function() {
                            o.$search.trigger("focus")
                        }), t.on("close", function() {
                            o.$search.val(""), o.$search.removeAttr("aria-activedescendant"), o.$search.trigger("focus")
                        }), t.on("enable", function() {
                            o.$search.prop("disabled", !1), o._transferTabIndex()
                        }), t.on("disable", function() {
                            o.$search.prop("disabled", !0)
                        }), t.on("focus", function(e) {
                            o.$search.trigger("focus")
                        }), t.on("results:focus", function(e) {
                            o.$search.attr("aria-activedescendant", e.id)
                        }), this.$selection.on("focusin", ".select2-search--inline", function(e) {
                            o.trigger("focus", e)
                        }), this.$selection.on("focusout", ".select2-search--inline", function(e) {
                            o._handleBlur(e)
                        }), this.$selection.on("keydown", ".select2-search--inline", function(e) {
                            if (e.stopPropagation(), o.trigger("keypress", e), o._keyUpPrevented = e.isDefaultPrevented(), e.which === n.BACKSPACE && "" === o.$search.val()) {
                                var t = o.$searchContainer.prev(".select2-selection__choice");
                                if (t.length > 0) {
                                    var i = t.data("data");
                                    o.searchRemoveChoice(i), e.preventDefault()
                                }
                            }
                        });
                        var r = document.documentMode,
                            s = r && 11 >= r;
                        this.$selection.on("input.searchcheck", ".select2-search--inline", function(e) {
                            return s ? void o.$selection.off("input.search input.searchcheck") : void o.$selection.off("keyup.search")
                        }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function(e) {
                            if (s && "input" === e.type) o.$selection.off("input.search input.searchcheck");
                            else {
                                var t = e.which;
                                t != n.SHIFT && t != n.CTRL && t != n.ALT && t != n.TAB && o.handleSearch(e)
                            }
                        })
                    }, i.prototype._transferTabIndex = function(e) {
                        this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1")
                    }, i.prototype.createPlaceholder = function(e, t) {
                        this.$search.attr("placeholder", t.text)
                    }, i.prototype.update = function(e, t) {
                        var n = this.$search[0] == document.activeElement;
                        this.$search.attr("placeholder", ""), e.call(this, t), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), n && this.$search.focus()
                    }, i.prototype.handleSearch = function() {
                        if (this.resizeSearch(), !this._keyUpPrevented) {
                            var e = this.$search.val();
                            this.trigger("query", {
                                term: e
                            })
                        }
                        this._keyUpPrevented = !1
                    }, i.prototype.searchRemoveChoice = function(e, t) {
                        this.trigger("unselect", {
                            data: t
                        }), this.$search.val(t.text), this.handleSearch()
                    }, i.prototype.resizeSearch = function() {
                        this.$search.css("width", "25px");
                        var e = "";
                        e = "" !== this.$search.attr("placeholder") ? this.$selection.find(".select2-selection__rendered").innerWidth() : .75 * (this.$search.val().length + 1) + "em", this.$search.css("width", e)
                    }, i
                }), t.define("select2/selection/eventRelay", ["jquery"], function(e) {
                    function t() {}
                    return t.prototype.bind = function(t, n, i) {
                        var o = this,
                            r = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                            s = ["opening", "closing", "selecting", "unselecting"];
                        t.call(this, n, i), n.on("*", function(t, n) {
                            if (-1 !== e.inArray(t, r)) {
                                n = n || {};
                                var i = e.Event("select2:" + t, {
                                    params: n
                                });
                                o.$element.trigger(i), -1 !== e.inArray(t, s) && (n.prevented = i.isDefaultPrevented())
                            }
                        })
                    }, t
                }), t.define("select2/translation", ["jquery", "require"], function(e, t) {
                    function n(e) {
                        this.dict = e || {}
                    }
                    return n.prototype.all = function() {
                        return this.dict
                    }, n.prototype.get = function(e) {
                        return this.dict[e]
                    }, n.prototype.extend = function(t) {
                        this.dict = e.extend({}, t.all(), this.dict)
                    }, n._cache = {}, n.loadPath = function(e) {
                        if (!(e in n._cache)) {
                            var i = t(e);
                            n._cache[e] = i
                        }
                        return new n(n._cache[e])
                    }, n
                }), t.define("select2/diacritics", [], function() {
                    return {
                        "Ⓐ": "A",
                        "Ａ": "A",
                        "À": "A",
                        "Á": "A",
                        "Â": "A",
                        "Ầ": "A",
                        "Ấ": "A",
                        "Ẫ": "A",
                        "Ẩ": "A",
                        "Ã": "A",
                        "Ā": "A",
                        "Ă": "A",
                        "Ằ": "A",
                        "Ắ": "A",
                        "Ẵ": "A",
                        "Ẳ": "A",
                        "Ȧ": "A",
                        "Ǡ": "A",
                        "Ä": "A",
                        "Ǟ": "A",
                        "Ả": "A",
                        "Å": "A",
                        "Ǻ": "A",
                        "Ǎ": "A",
                        "Ȁ": "A",
                        "Ȃ": "A",
                        "Ạ": "A",
                        "Ậ": "A",
                        "Ặ": "A",
                        "Ḁ": "A",
                        "Ą": "A",
                        "Ⱥ": "A",
                        "Ɐ": "A",
                        "Ꜳ": "AA",
                        "Æ": "AE",
                        "Ǽ": "AE",
                        "Ǣ": "AE",
                        "Ꜵ": "AO",
                        "Ꜷ": "AU",
                        "Ꜹ": "AV",
                        "Ꜻ": "AV",
                        "Ꜽ": "AY",
                        "Ⓑ": "B",
                        "Ｂ": "B",
                        "Ḃ": "B",
                        "Ḅ": "B",
                        "Ḇ": "B",
                        "Ƀ": "B",
                        "Ƃ": "B",
                        "Ɓ": "B",
                        "Ⓒ": "C",
                        "Ｃ": "C",
                        "Ć": "C",
                        "Ĉ": "C",
                        "Ċ": "C",
                        "Č": "C",
                        "Ç": "C",
                        "Ḉ": "C",
                        "Ƈ": "C",
                        "Ȼ": "C",
                        "Ꜿ": "C",
                        "Ⓓ": "D",
                        "Ｄ": "D",
                        "Ḋ": "D",
                        "Ď": "D",
                        "Ḍ": "D",
                        "Ḑ": "D",
                        "Ḓ": "D",
                        "Ḏ": "D",
                        "Đ": "D",
                        "Ƌ": "D",
                        "Ɗ": "D",
                        "Ɖ": "D",
                        "Ꝺ": "D",
                        "Ǳ": "DZ",
                        "Ǆ": "DZ",
                        "ǲ": "Dz",
                        "ǅ": "Dz",
                        "Ⓔ": "E",
                        "Ｅ": "E",
                        "È": "E",
                        "É": "E",
                        "Ê": "E",
                        "Ề": "E",
                        "Ế": "E",
                        "Ễ": "E",
                        "Ể": "E",
                        "Ẽ": "E",
                        "Ē": "E",
                        "Ḕ": "E",
                        "Ḗ": "E",
                        "Ĕ": "E",
                        "Ė": "E",
                        "Ë": "E",
                        "Ẻ": "E",
                        "Ě": "E",
                        "Ȅ": "E",
                        "Ȇ": "E",
                        "Ẹ": "E",
                        "Ệ": "E",
                        "Ȩ": "E",
                        "Ḝ": "E",
                        "Ę": "E",
                        "Ḙ": "E",
                        "Ḛ": "E",
                        "Ɛ": "E",
                        "Ǝ": "E",
                        "Ⓕ": "F",
                        "Ｆ": "F",
                        "Ḟ": "F",
                        "Ƒ": "F",
                        "Ꝼ": "F",
                        "Ⓖ": "G",
                        "Ｇ": "G",
                        "Ǵ": "G",
                        "Ĝ": "G",
                        "Ḡ": "G",
                        "Ğ": "G",
                        "Ġ": "G",
                        "Ǧ": "G",
                        "Ģ": "G",
                        "Ǥ": "G",
                        "Ɠ": "G",
                        "Ꞡ": "G",
                        "Ᵹ": "G",
                        "Ꝿ": "G",
                        "Ⓗ": "H",
                        "Ｈ": "H",
                        "Ĥ": "H",
                        "Ḣ": "H",
                        "Ḧ": "H",
                        "Ȟ": "H",
                        "Ḥ": "H",
                        "Ḩ": "H",
                        "Ḫ": "H",
                        "Ħ": "H",
                        "Ⱨ": "H",
                        "Ⱶ": "H",
                        "Ɥ": "H",
                        "Ⓘ": "I",
                        "Ｉ": "I",
                        "Ì": "I",
                        "Í": "I",
                        "Î": "I",
                        "Ĩ": "I",
                        "Ī": "I",
                        "Ĭ": "I",
                        "İ": "I",
                        "Ï": "I",
                        "Ḯ": "I",
                        "Ỉ": "I",
                        "Ǐ": "I",
                        "Ȉ": "I",
                        "Ȋ": "I",
                        "Ị": "I",
                        "Į": "I",
                        "Ḭ": "I",
                        "Ɨ": "I",
                        "Ⓙ": "J",
                        "Ｊ": "J",
                        "Ĵ": "J",
                        "Ɉ": "J",
                        "Ⓚ": "K",
                        "Ｋ": "K",
                        "Ḱ": "K",
                        "Ǩ": "K",
                        "Ḳ": "K",
                        "Ķ": "K",
                        "Ḵ": "K",
                        "Ƙ": "K",
                        "Ⱪ": "K",
                        "Ꝁ": "K",
                        "Ꝃ": "K",
                        "Ꝅ": "K",
                        "Ꞣ": "K",
                        "Ⓛ": "L",
                        "Ｌ": "L",
                        "Ŀ": "L",
                        "Ĺ": "L",
                        "Ľ": "L",
                        "Ḷ": "L",
                        "Ḹ": "L",
                        "Ļ": "L",
                        "Ḽ": "L",
                        "Ḻ": "L",
                        "Ł": "L",
                        "Ƚ": "L",
                        "Ɫ": "L",
                        "Ⱡ": "L",
                        "Ꝉ": "L",
                        "Ꝇ": "L",
                        "Ꞁ": "L",
                        "Ǉ": "LJ",
                        "ǈ": "Lj",
                        "Ⓜ": "M",
                        "Ｍ": "M",
                        "Ḿ": "M",
                        "Ṁ": "M",
                        "Ṃ": "M",
                        "Ɱ": "M",
                        "Ɯ": "M",
                        "Ⓝ": "N",
                        "Ｎ": "N",
                        "Ǹ": "N",
                        "Ń": "N",
                        "Ñ": "N",
                        "Ṅ": "N",
                        "Ň": "N",
                        "Ṇ": "N",
                        "Ņ": "N",
                        "Ṋ": "N",
                        "Ṉ": "N",
                        "Ƞ": "N",
                        "Ɲ": "N",
                        "Ꞑ": "N",
                        "Ꞥ": "N",
                        "Ǌ": "NJ",
                        "ǋ": "Nj",
                        "Ⓞ": "O",
                        "Ｏ": "O",
                        "Ò": "O",
                        "Ó": "O",
                        "Ô": "O",
                        "Ồ": "O",
                        "Ố": "O",
                        "Ỗ": "O",
                        "Ổ": "O",
                        "Õ": "O",
                        "Ṍ": "O",
                        "Ȭ": "O",
                        "Ṏ": "O",
                        "Ō": "O",
                        "Ṑ": "O",
                        "Ṓ": "O",
                        "Ŏ": "O",
                        "Ȯ": "O",
                        "Ȱ": "O",
                        "Ö": "O",
                        "Ȫ": "O",
                        "Ỏ": "O",
                        "Ő": "O",
                        "Ǒ": "O",
                        "Ȍ": "O",
                        "Ȏ": "O",
                        "Ơ": "O",
                        "Ờ": "O",
                        "Ớ": "O",
                        "Ỡ": "O",
                        "Ở": "O",
                        "Ợ": "O",
                        "Ọ": "O",
                        "Ộ": "O",
                        "Ǫ": "O",
                        "Ǭ": "O",
                        "Ø": "O",
                        "Ǿ": "O",
                        "Ɔ": "O",
                        "Ɵ": "O",
                        "Ꝋ": "O",
                        "Ꝍ": "O",
                        "Ƣ": "OI",
                        "Ꝏ": "OO",
                        "Ȣ": "OU",
                        "Ⓟ": "P",
                        "Ｐ": "P",
                        "Ṕ": "P",
                        "Ṗ": "P",
                        "Ƥ": "P",
                        "Ᵽ": "P",
                        "Ꝑ": "P",
                        "Ꝓ": "P",
                        "Ꝕ": "P",
                        "Ⓠ": "Q",
                        "Ｑ": "Q",
                        "Ꝗ": "Q",
                        "Ꝙ": "Q",
                        "Ɋ": "Q",
                        "Ⓡ": "R",
                        "Ｒ": "R",
                        "Ŕ": "R",
                        "Ṙ": "R",
                        "Ř": "R",
                        "Ȑ": "R",
                        "Ȓ": "R",
                        "Ṛ": "R",
                        "Ṝ": "R",
                        "Ŗ": "R",
                        "Ṟ": "R",
                        "Ɍ": "R",
                        "Ɽ": "R",
                        "Ꝛ": "R",
                        "Ꞧ": "R",
                        "Ꞃ": "R",
                        "Ⓢ": "S",
                        "Ｓ": "S",
                        "ẞ": "S",
                        "Ś": "S",
                        "Ṥ": "S",
                        "Ŝ": "S",
                        "Ṡ": "S",
                        "Š": "S",
                        "Ṧ": "S",
                        "Ṣ": "S",
                        "Ṩ": "S",
                        "Ș": "S",
                        "Ş": "S",
                        "Ȿ": "S",
                        "Ꞩ": "S",
                        "Ꞅ": "S",
                        "Ⓣ": "T",
                        "Ｔ": "T",
                        "Ṫ": "T",
                        "Ť": "T",
                        "Ṭ": "T",
                        "Ț": "T",
                        "Ţ": "T",
                        "Ṱ": "T",
                        "Ṯ": "T",
                        "Ŧ": "T",
                        "Ƭ": "T",
                        "Ʈ": "T",
                        "Ⱦ": "T",
                        "Ꞇ": "T",
                        "Ꜩ": "TZ",
                        "Ⓤ": "U",
                        "Ｕ": "U",
                        "Ù": "U",
                        "Ú": "U",
                        "Û": "U",
                        "Ũ": "U",
                        "Ṹ": "U",
                        "Ū": "U",
                        "Ṻ": "U",
                        "Ŭ": "U",
                        "Ü": "U",
                        "Ǜ": "U",
                        "Ǘ": "U",
                        "Ǖ": "U",
                        "Ǚ": "U",
                        "Ủ": "U",
                        "Ů": "U",
                        "Ű": "U",
                        "Ǔ": "U",
                        "Ȕ": "U",
                        "Ȗ": "U",
                        "Ư": "U",
                        "Ừ": "U",
                        "Ứ": "U",
                        "Ữ": "U",
                        "Ử": "U",
                        "Ự": "U",
                        "Ụ": "U",
                        "Ṳ": "U",
                        "Ų": "U",
                        "Ṷ": "U",
                        "Ṵ": "U",
                        "Ʉ": "U",
                        "Ⓥ": "V",
                        "Ｖ": "V",
                        "Ṽ": "V",
                        "Ṿ": "V",
                        "Ʋ": "V",
                        "Ꝟ": "V",
                        "Ʌ": "V",
                        "Ꝡ": "VY",
                        "Ⓦ": "W",
                        "Ｗ": "W",
                        "Ẁ": "W",
                        "Ẃ": "W",
                        "Ŵ": "W",
                        "Ẇ": "W",
                        "Ẅ": "W",
                        "Ẉ": "W",
                        "Ⱳ": "W",
                        "Ⓧ": "X",
                        "Ｘ": "X",
                        "Ẋ": "X",
                        "Ẍ": "X",
                        "Ⓨ": "Y",
                        "Ｙ": "Y",
                        "Ỳ": "Y",
                        "Ý": "Y",
                        "Ŷ": "Y",
                        "Ỹ": "Y",
                        "Ȳ": "Y",
                        "Ẏ": "Y",
                        "Ÿ": "Y",
                        "Ỷ": "Y",
                        "Ỵ": "Y",
                        "Ƴ": "Y",
                        "Ɏ": "Y",
                        "Ỿ": "Y",
                        "Ⓩ": "Z",
                        "Ｚ": "Z",
                        "Ź": "Z",
                        "Ẑ": "Z",
                        "Ż": "Z",
                        "Ž": "Z",
                        "Ẓ": "Z",
                        "Ẕ": "Z",
                        "Ƶ": "Z",
                        "Ȥ": "Z",
                        "Ɀ": "Z",
                        "Ⱬ": "Z",
                        "Ꝣ": "Z",
                        "ⓐ": "a",
                        "ａ": "a",
                        "ẚ": "a",
                        "à": "a",
                        "á": "a",
                        "â": "a",
                        "ầ": "a",
                        "ấ": "a",
                        "ẫ": "a",
                        "ẩ": "a",
                        "ã": "a",
                        "ā": "a",
                        "ă": "a",
                        "ằ": "a",
                        "ắ": "a",
                        "ẵ": "a",
                        "ẳ": "a",
                        "ȧ": "a",
                        "ǡ": "a",
                        "ä": "a",
                        "ǟ": "a",
                        "ả": "a",
                        "å": "a",
                        "ǻ": "a",
                        "ǎ": "a",
                        "ȁ": "a",
                        "ȃ": "a",
                        "ạ": "a",
                        "ậ": "a",
                        "ặ": "a",
                        "ḁ": "a",
                        "ą": "a",
                        "ⱥ": "a",
                        "ɐ": "a",
                        "ꜳ": "aa",
                        "æ": "ae",
                        "ǽ": "ae",
                        "ǣ": "ae",
                        "ꜵ": "ao",
                        "ꜷ": "au",
                        "ꜹ": "av",
                        "ꜻ": "av",
                        "ꜽ": "ay",
                        "ⓑ": "b",
                        "ｂ": "b",
                        "ḃ": "b",
                        "ḅ": "b",
                        "ḇ": "b",
                        "ƀ": "b",
                        "ƃ": "b",
                        "ɓ": "b",
                        "ⓒ": "c",
                        "ｃ": "c",
                        "ć": "c",
                        "ĉ": "c",
                        "ċ": "c",
                        "č": "c",
                        "ç": "c",
                        "ḉ": "c",
                        "ƈ": "c",
                        "ȼ": "c",
                        "ꜿ": "c",
                        "ↄ": "c",
                        "ⓓ": "d",
                        "ｄ": "d",
                        "ḋ": "d",
                        "ď": "d",
                        "ḍ": "d",
                        "ḑ": "d",
                        "ḓ": "d",
                        "ḏ": "d",
                        "đ": "d",
                        "ƌ": "d",
                        "ɖ": "d",
                        "ɗ": "d",
                        "ꝺ": "d",
                        "ǳ": "dz",
                        "ǆ": "dz",
                        "ⓔ": "e",
                        "ｅ": "e",
                        "è": "e",
                        "é": "e",
                        "ê": "e",
                        "ề": "e",
                        "ế": "e",
                        "ễ": "e",
                        "ể": "e",
                        "ẽ": "e",
                        "ē": "e",
                        "ḕ": "e",
                        "ḗ": "e",
                        "ĕ": "e",
                        "ė": "e",
                        "ë": "e",
                        "ẻ": "e",
                        "ě": "e",
                        "ȅ": "e",
                        "ȇ": "e",
                        "ẹ": "e",
                        "ệ": "e",
                        "ȩ": "e",
                        "ḝ": "e",
                        "ę": "e",
                        "ḙ": "e",
                        "ḛ": "e",
                        "ɇ": "e",
                        "ɛ": "e",
                        "ǝ": "e",
                        "ⓕ": "f",
                        "ｆ": "f",
                        "ḟ": "f",
                        "ƒ": "f",
                        "ꝼ": "f",
                        "ⓖ": "g",
                        "ｇ": "g",
                        "ǵ": "g",
                        "ĝ": "g",
                        "ḡ": "g",
                        "ğ": "g",
                        "ġ": "g",
                        "ǧ": "g",
                        "ģ": "g",
                        "ǥ": "g",
                        "ɠ": "g",
                        "ꞡ": "g",
                        "ᵹ": "g",
                        "ꝿ": "g",
                        "ⓗ": "h",
                        "ｈ": "h",
                        "ĥ": "h",
                        "ḣ": "h",
                        "ḧ": "h",
                        "ȟ": "h",
                        "ḥ": "h",
                        "ḩ": "h",
                        "ḫ": "h",
                        "ẖ": "h",
                        "ħ": "h",
                        "ⱨ": "h",
                        "ⱶ": "h",
                        "ɥ": "h",
                        "ƕ": "hv",
                        "ⓘ": "i",
                        "ｉ": "i",
                        "ì": "i",
                        "í": "i",
                        "î": "i",
                        "ĩ": "i",
                        "ī": "i",
                        "ĭ": "i",
                        "ï": "i",
                        "ḯ": "i",
                        "ỉ": "i",
                        "ǐ": "i",
                        "ȉ": "i",
                        "ȋ": "i",
                        "ị": "i",
                        "į": "i",
                        "ḭ": "i",
                        "ɨ": "i",
                        "ı": "i",
                        "ⓙ": "j",
                        "ｊ": "j",
                        "ĵ": "j",
                        "ǰ": "j",
                        "ɉ": "j",
                        "ⓚ": "k",
                        "ｋ": "k",
                        "ḱ": "k",
                        "ǩ": "k",
                        "ḳ": "k",
                        "ķ": "k",
                        "ḵ": "k",
                        "ƙ": "k",
                        "ⱪ": "k",
                        "ꝁ": "k",
                        "ꝃ": "k",
                        "ꝅ": "k",
                        "ꞣ": "k",
                        "ⓛ": "l",
                        "ｌ": "l",
                        "ŀ": "l",
                        "ĺ": "l",
                        "ľ": "l",
                        "ḷ": "l",
                        "ḹ": "l",
                        "ļ": "l",
                        "ḽ": "l",
                        "ḻ": "l",
                        "ſ": "l",
                        "ł": "l",
                        "ƚ": "l",
                        "ɫ": "l",
                        "ⱡ": "l",
                        "ꝉ": "l",
                        "ꞁ": "l",
                        "ꝇ": "l",
                        "ǉ": "lj",
                        "ⓜ": "m",
                        "ｍ": "m",
                        "ḿ": "m",
                        "ṁ": "m",
                        "ṃ": "m",
                        "ɱ": "m",
                        "ɯ": "m",
                        "ⓝ": "n",
                        "ｎ": "n",
                        "ǹ": "n",
                        "ń": "n",
                        "ñ": "n",
                        "ṅ": "n",
                        "ň": "n",
                        "ṇ": "n",
                        "ņ": "n",
                        "ṋ": "n",
                        "ṉ": "n",
                        "ƞ": "n",
                        "ɲ": "n",
                        "ŉ": "n",
                        "ꞑ": "n",
                        "ꞥ": "n",
                        "ǌ": "nj",
                        "ⓞ": "o",
                        "ｏ": "o",
                        "ò": "o",
                        "ó": "o",
                        "ô": "o",
                        "ồ": "o",
                        "ố": "o",
                        "ỗ": "o",
                        "ổ": "o",
                        "õ": "o",
                        "ṍ": "o",
                        "ȭ": "o",
                        "ṏ": "o",
                        "ō": "o",
                        "ṑ": "o",
                        "ṓ": "o",
                        "ŏ": "o",
                        "ȯ": "o",
                        "ȱ": "o",
                        "ö": "o",
                        "ȫ": "o",
                        "ỏ": "o",
                        "ő": "o",
                        "ǒ": "o",
                        "ȍ": "o",
                        "ȏ": "o",
                        "ơ": "o",
                        "ờ": "o",
                        "ớ": "o",
                        "ỡ": "o",
                        "ở": "o",
                        "ợ": "o",
                        "ọ": "o",
                        "ộ": "o",
                        "ǫ": "o",
                        "ǭ": "o",
                        "ø": "o",
                        "ǿ": "o",
                        "ɔ": "o",
                        "ꝋ": "o",
                        "ꝍ": "o",
                        "ɵ": "o",
                        "ƣ": "oi",
                        "ȣ": "ou",
                        "ꝏ": "oo",
                        "ⓟ": "p",
                        "ｐ": "p",
                        "ṕ": "p",
                        "ṗ": "p",
                        "ƥ": "p",
                        "ᵽ": "p",
                        "ꝑ": "p",
                        "ꝓ": "p",
                        "ꝕ": "p",
                        "ⓠ": "q",
                        "ｑ": "q",
                        "ɋ": "q",
                        "ꝗ": "q",
                        "ꝙ": "q",
                        "ⓡ": "r",
                        "ｒ": "r",
                        "ŕ": "r",
                        "ṙ": "r",
                        "ř": "r",
                        "ȑ": "r",
                        "ȓ": "r",
                        "ṛ": "r",
                        "ṝ": "r",
                        "ŗ": "r",
                        "ṟ": "r",
                        "ɍ": "r",
                        "ɽ": "r",
                        "ꝛ": "r",
                        "ꞧ": "r",
                        "ꞃ": "r",
                        "ⓢ": "s",
                        "ｓ": "s",
                        "ß": "s",
                        "ś": "s",
                        "ṥ": "s",
                        "ŝ": "s",
                        "ṡ": "s",
                        "š": "s",
                        "ṧ": "s",
                        "ṣ": "s",
                        "ṩ": "s",
                        "ș": "s",
                        "ş": "s",
                        "ȿ": "s",
                        "ꞩ": "s",
                        "ꞅ": "s",
                        "ẛ": "s",
                        "ⓣ": "t",
                        "ｔ": "t",
                        "ṫ": "t",
                        "ẗ": "t",
                        "ť": "t",
                        "ṭ": "t",
                        "ț": "t",
                        "ţ": "t",
                        "ṱ": "t",
                        "ṯ": "t",
                        "ŧ": "t",
                        "ƭ": "t",
                        "ʈ": "t",
                        "ⱦ": "t",
                        "ꞇ": "t",
                        "ꜩ": "tz",
                        "ⓤ": "u",
                        "ｕ": "u",
                        "ù": "u",
                        "ú": "u",
                        "û": "u",
                        "ũ": "u",
                        "ṹ": "u",
                        "ū": "u",
                        "ṻ": "u",
                        "ŭ": "u",
                        "ü": "u",
                        "ǜ": "u",
                        "ǘ": "u",
                        "ǖ": "u",
                        "ǚ": "u",
                        "ủ": "u",
                        "ů": "u",
                        "ű": "u",
                        "ǔ": "u",
                        "ȕ": "u",
                        "ȗ": "u",
                        "ư": "u",
                        "ừ": "u",
                        "ứ": "u",
                        "ữ": "u",
                        "ử": "u",
                        "ự": "u",
                        "ụ": "u",
                        "ṳ": "u",
                        "ų": "u",
                        "ṷ": "u",
                        "ṵ": "u",
                        "ʉ": "u",
                        "ⓥ": "v",
                        "ｖ": "v",
                        "ṽ": "v",
                        "ṿ": "v",
                        "ʋ": "v",
                        "ꝟ": "v",
                        "ʌ": "v",
                        "ꝡ": "vy",
                        "ⓦ": "w",
                        "ｗ": "w",
                        "ẁ": "w",
                        "ẃ": "w",
                        "ŵ": "w",
                        "ẇ": "w",
                        "ẅ": "w",
                        "ẘ": "w",
                        "ẉ": "w",
                        "ⱳ": "w",
                        "ⓧ": "x",
                        "ｘ": "x",
                        "ẋ": "x",
                        "ẍ": "x",
                        "ⓨ": "y",
                        "ｙ": "y",
                        "ỳ": "y",
                        "ý": "y",
                        "ŷ": "y",
                        "ỹ": "y",
                        "ȳ": "y",
                        "ẏ": "y",
                        "ÿ": "y",
                        "ỷ": "y",
                        "ẙ": "y",
                        "ỵ": "y",
                        "ƴ": "y",
                        "ɏ": "y",
                        "ỿ": "y",
                        "ⓩ": "z",
                        "ｚ": "z",
                        "ź": "z",
                        "ẑ": "z",
                        "ż": "z",
                        "ž": "z",
                        "ẓ": "z",
                        "ẕ": "z",
                        "ƶ": "z",
                        "ȥ": "z",
                        "ɀ": "z",
                        "ⱬ": "z",
                        "ꝣ": "z",
                        "Ά": "Α",
                        "Έ": "Ε",
                        "Ή": "Η",
                        "Ί": "Ι",
                        "Ϊ": "Ι",
                        "Ό": "Ο",
                        "Ύ": "Υ",
                        "Ϋ": "Υ",
                        "Ώ": "Ω",
                        "ά": "α",
                        "έ": "ε",
                        "ή": "η",
                        "ί": "ι",
                        "ϊ": "ι",
                        "ΐ": "ι",
                        "ό": "ο",
                        "ύ": "υ",
                        "ϋ": "υ",
                        "ΰ": "υ",
                        "ω": "ω",
                        "ς": "σ"
                    }
                }), t.define("select2/data/base", ["../utils"], function(e) {
                    function t(e, n) {
                        t.__super__.constructor.call(this)
                    }
                    return e.Extend(t, e.Observable), t.prototype.current = function(e) {
                        throw new Error("The `current` method must be defined in child classes.")
                    }, t.prototype.query = function(e, t) {
                        throw new Error("The `query` method must be defined in child classes.")
                    }, t.prototype.bind = function(e, t) {}, t.prototype.destroy = function() {}, t.prototype.generateResultId = function(t, n) {
                        var i = t.id + "-result-";
                        return i += e.generateChars(4), i += null != n.id ? "-" + n.id.toString() : "-" + e.generateChars(4)
                    }, t
                }), t.define("select2/data/select", ["./base", "../utils", "jquery"], function(e, t, n) {
                    function i(e, t) {
                        this.$element = e, this.options = t, i.__super__.constructor.call(this)
                    }
                    return t.Extend(i, e), i.prototype.current = function(e) {
                        var t = [],
                            i = this;
                        this.$element.find(":selected").each(function() {
                            var e = n(this),
                                o = i.item(e);
                            t.push(o)
                        }), e(t)
                    }, i.prototype.select = function(e) {
                        var t = this;
                        if (e.selected = !0, n(e.element).is("option")) return e.element.selected = !0, void this.$element.trigger("change");
                        if (this.$element.prop("multiple")) this.current(function(i) {
                            var o = [];
                            (e = [e]).push.apply(e, i);
                            for (var r = 0; r < e.length; r++) {
                                var s = e[r].id; - 1 === n.inArray(s, o) && o.push(s)
                            }
                            t.$element.val(o), t.$element.trigger("change")
                        });
                        else {
                            var i = e.id;
                            this.$element.val(i), this.$element.trigger("change")
                        }
                    }, i.prototype.unselect = function(e) {
                        var t = this;
                        if (this.$element.prop("multiple")) return e.selected = !1, n(e.element).is("option") ? (e.element.selected = !1, void this.$element.trigger("change")) : void this.current(function(i) {
                            for (var o = [], r = 0; r < i.length; r++) {
                                var s = i[r].id;
                                s !== e.id && -1 === n.inArray(s, o) && o.push(s)
                            }
                            t.$element.val(o), t.$element.trigger("change")
                        })
                    }, i.prototype.bind = function(e, t) {
                        var n = this;
                        this.container = e, e.on("select", function(e) {
                            n.select(e.data)
                        }), e.on("unselect", function(e) {
                            n.unselect(e.data)
                        })
                    }, i.prototype.destroy = function() {
                        this.$element.find("*").each(function() {
                            n.removeData(this, "data")
                        })
                    }, i.prototype.query = function(e, t) {
                        var i = [],
                            o = this;
                        this.$element.children().each(function() {
                            var t = n(this);
                            if (t.is("option") || t.is("optgroup")) {
                                var r = o.item(t),
                                    s = o.matches(e, r);
                                null !== s && i.push(s)
                            }
                        }), t({
                            results: i
                        })
                    }, i.prototype.addOptions = function(e) {
                        t.appendMany(this.$element, e)
                    }, i.prototype.option = function(e) {
                        var t;
                        e.children ? (t = document.createElement("optgroup"), t.label = e.text) : void 0 !== (t = document.createElement("option")).textContent ? t.textContent = e.text : t.innerText = e.text, e.id && (t.value = e.id), e.disabled && (t.disabled = !0), e.selected && (t.selected = !0), e.title && (t.title = e.title);
                        var i = n(t),
                            o = this._normalizeItem(e);
                        return o.element = t, n.data(t, "data", o), i
                    }, i.prototype.item = function(e) {
                        var t = {};
                        if (null != (t = n.data(e[0], "data"))) return t;
                        if (e.is("option")) t = {
                            id: e.val(),
                            text: e.text(),
                            disabled: e.prop("disabled"),
                            selected: e.prop("selected"),
                            title: e.prop("title")
                        };
                        else if (e.is("optgroup")) {
                            t = {
                                text: e.prop("label"),
                                children: [],
                                title: e.prop("title")
                            };
                            for (var i = e.children("option"), o = [], r = 0; r < i.length; r++) {
                                var s = n(i[r]),
                                    a = this.item(s);
                                o.push(a)
                            }
                            t.children = o
                        }
                        return t = this._normalizeItem(t), t.element = e[0], n.data(e[0], "data", t), t
                    }, i.prototype._normalizeItem = function(e) {
                        n.isPlainObject(e) || (e = {
                            id: e,
                            text: e
                        });
                        var t = {
                            selected: !1,
                            disabled: !1
                        };
                        return null != (e = n.extend({}, {
                            text: ""
                        }, e)).id && (e.id = e.id.toString()), null != e.text && (e.text = e.text.toString()), null == e._resultId && e.id && null != this.container && (e._resultId = this.generateResultId(this.container, e)), n.extend({}, t, e)
                    }, i.prototype.matches = function(e, t) {
                        return this.options.get("matcher")(e, t)
                    }, i
                }), t.define("select2/data/array", ["./select", "../utils", "jquery"], function(e, t, n) {
                    function i(e, t) {
                        var n = t.get("data") || [];
                        i.__super__.constructor.call(this, e, t), this.addOptions(this.convertToOptions(n))
                    }
                    return t.Extend(i, e), i.prototype.select = function(e) {
                        var t = this.$element.find("option").filter(function(t, n) {
                            return n.value == e.id.toString()
                        });
                        0 === t.length && (t = this.option(e), this.addOptions(t)), i.__super__.select.call(this, e)
                    }, i.prototype.convertToOptions = function(e) {
                        for (var i = this, o = this.$element.find("option"), r = o.map(function() {
                                return i.item(n(this)).id
                            }).get(), s = [], a = 0; a < e.length; a++) {
                            var l = this._normalizeItem(e[a]);
                            if (n.inArray(l.id, r) >= 0) {
                                var c = o.filter(function(e) {
                                        return function() {
                                            return n(this).val() == e.id
                                        }
                                    }(l)),
                                    u = this.item(c),
                                    d = n.extend(!0, {}, l, u),
                                    p = this.option(d);
                                c.replaceWith(p)
                            } else {
                                var h = this.option(l);
                                if (l.children) {
                                    var f = this.convertToOptions(l.children);
                                    t.appendMany(h, f)
                                }
                                s.push(h)
                            }
                        }
                        return s
                    }, i
                }), t.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(e, t, n) {
                    function i(e, t) {
                        this.ajaxOptions = this._applyDefaults(t.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), i.__super__.constructor.call(this, e, t)
                    }
                    return t.Extend(i, e), i.prototype._applyDefaults = function(e) {
                        var t = {
                            data: function(e) {
                                return n.extend({}, e, {
                                    q: e.term
                                })
                            },
                            transport: function(e, t, i) {
                                var o = n.ajax(e);
                                return o.then(t), o.fail(i), o
                            }
                        };
                        return n.extend({}, t, e, !0)
                    }, i.prototype.processResults = function(e) {
                        return e
                    }, i.prototype.query = function(e, t) {
                        function i() {
                            var i = r.transport(r, function(i) {
                                var r = o.processResults(i, e);
                                o.options.get("debug") && window.console && console.error && (r && r.results && n.isArray(r.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), t(r)
                            }, function() {
                                i.status && "0" === i.status || o.trigger("results:message", {
                                    message: "errorLoading"
                                })
                            });
                            o._request = i
                        }
                        var o = this;
                        null != this._request && (n.isFunction(this._request.abort) && this._request.abort(), this._request = null);
                        var r = n.extend({
                            type: "GET"
                        }, this.ajaxOptions);
                        "function" == typeof r.url && (r.url = r.url.call(this.$element, e)), "function" == typeof r.data && (r.data = r.data.call(this.$element, e)), this.ajaxOptions.delay && null != e.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(i, this.ajaxOptions.delay)) : i()
                    }, i
                }), t.define("select2/data/tags", ["jquery"], function(e) {
                    function t(t, n, i) {
                        var o = i.get("tags"),
                            r = i.get("createTag");
                        void 0 !== r && (this.createTag = r);
                        var s = i.get("insertTag");
                        if (void 0 !== s && (this.insertTag = s), t.call(this, n, i), e.isArray(o))
                            for (var a = 0; a < o.length; a++) {
                                var l = o[a],
                                    c = this._normalizeItem(l),
                                    u = this.option(c);
                                this.$element.append(u)
                            }
                    }
                    return t.prototype.query = function(e, t, n) {
                        function i(e, r) {
                            for (var s = e.results, a = 0; a < s.length; a++) {
                                var l = s[a],
                                    c = null != l.children && !i({
                                        results: l.children
                                    }, !0);
                                if (l.text === t.term || c) return !r && (e.data = s, void n(e))
                            }
                            if (r) return !0;
                            var u = o.createTag(t);
                            if (null != u) {
                                var d = o.option(u);
                                d.attr("data-select2-tag", !0), o.addOptions([d]), o.insertTag(s, u)
                            }
                            e.results = s, n(e)
                        }
                        var o = this;
                        return this._removeOldTags(), null == t.term || null != t.page ? void e.call(this, t, n) : void e.call(this, t, i)
                    }, t.prototype.createTag = function(t, n) {
                        var i = e.trim(n.term);
                        return "" === i ? null : {
                            id: i,
                            text: i
                        }
                    }, t.prototype.insertTag = function(e, t, n) {
                        t.unshift(n)
                    }, t.prototype._removeOldTags = function(t) {
                        (this._lastTag, this.$element.find("option[data-select2-tag]")).each(function() {
                            this.selected || e(this).remove()
                        })
                    }, t
                }), t.define("select2/data/tokenizer", ["jquery"], function(e) {
                    function t(e, t, n) {
                        var i = n.get("tokenizer");
                        void 0 !== i && (this.tokenizer = i), e.call(this, t, n)
                    }
                    return t.prototype.bind = function(e, t, n) {
                        e.call(this, t, n), this.$search = t.dropdown.$search || t.selection.$search || n.find(".select2-search__field")
                    }, t.prototype.query = function(t, n, i) {
                        function o(e) {
                            r.trigger("select", {
                                data: e
                            })
                        }
                        var r = this;
                        n.term = n.term || "";
                        var s = this.tokenizer(n, this.options, function(t) {
                            var n = r._normalizeItem(t);
                            if (!r.$element.find("option").filter(function() {
                                    return e(this).val() === n.id
                                }).length) {
                                var i = r.option(n);
                                i.attr("data-select2-tag", !0), r._removeOldTags(), r.addOptions([i])
                            }
                            o(n)
                        });
                        s.term !== n.term && (this.$search.length && (this.$search.val(s.term), this.$search.focus()), n.term = s.term), t.call(this, n, i)
                    }, t.prototype.tokenizer = function(t, n, i, o) {
                        for (var r = i.get("tokenSeparators") || [], s = n.term, a = 0, l = this.createTag || function(e) {
                                return {
                                    id: e.term,
                                    text: e.term
                                }
                            }; a < s.length;) {
                            var c = s[a];
                            if (-1 !== e.inArray(c, r)) {
                                var u = s.substr(0, a),
                                    d = l(e.extend({}, n, {
                                        term: u
                                    }));
                                null != d ? (o(d), s = s.substr(a + 1) || "", a = 0) : a++
                            } else a++
                        }
                        return {
                            term: s
                        }
                    }, t
                }), t.define("select2/data/minimumInputLength", [], function() {
                    function e(e, t, n) {
                        this.minimumInputLength = n.get("minimumInputLength"), e.call(this, t, n)
                    }
                    return e.prototype.query = function(e, t, n) {
                        return t.term = t.term || "", t.term.length < this.minimumInputLength ? void this.trigger("results:message", {
                            message: "inputTooShort",
                            args: {
                                minimum: this.minimumInputLength,
                                input: t.term,
                                params: t
                            }
                        }) : void e.call(this, t, n)
                    }, e
                }), t.define("select2/data/maximumInputLength", [], function() {
                    function e(e, t, n) {
                        this.maximumInputLength = n.get("maximumInputLength"), e.call(this, t, n)
                    }
                    return e.prototype.query = function(e, t, n) {
                        return t.term = t.term || "", this.maximumInputLength > 0 && t.term.length > this.maximumInputLength ? void this.trigger("results:message", {
                            message: "inputTooLong",
                            args: {
                                maximum: this.maximumInputLength,
                                input: t.term,
                                params: t
                            }
                        }) : void e.call(this, t, n)
                    }, e
                }), t.define("select2/data/maximumSelectionLength", [], function() {
                    function e(e, t, n) {
                        this.maximumSelectionLength = n.get("maximumSelectionLength"), e.call(this, t, n)
                    }
                    return e.prototype.query = function(e, t, n) {
                        var i = this;
                        this.current(function(o) {
                            var r = null != o ? o.length : 0;
                            return i.maximumSelectionLength > 0 && r >= i.maximumSelectionLength ? void i.trigger("results:message", {
                                message: "maximumSelected",
                                args: {
                                    maximum: i.maximumSelectionLength
                                }
                            }) : void e.call(i, t, n)
                        })
                    }, e
                }), t.define("select2/dropdown", ["jquery", "./utils"], function(e, t) {
                    function n(e, t) {
                        this.$element = e, this.options = t, n.__super__.constructor.call(this)
                    }
                    return t.Extend(n, t.Observable), n.prototype.render = function() {
                        var t = e('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                        return t.attr("dir", this.options.get("dir")), this.$dropdown = t, t
                    }, n.prototype.bind = function() {}, n.prototype.position = function(e, t) {}, n.prototype.destroy = function() {
                        this.$dropdown.remove()
                    }, n
                }), t.define("select2/dropdown/search", ["jquery", "../utils"], function(e, t) {
                    function n() {}
                    return n.prototype.render = function(t) {
                        var n = t.call(this),
                            i = e('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');
                        return this.$searchContainer = i, this.$search = i.find("input"), n.prepend(i), n
                    }, n.prototype.bind = function(t, n, i) {
                        var o = this;
                        t.call(this, n, i), this.$search.on("keydown", function(e) {
                            o.trigger("keypress", e), o._keyUpPrevented = e.isDefaultPrevented()
                        }), this.$search.on("input", function(t) {
                            e(this).off("keyup")
                        }), this.$search.on("keyup input", function(e) {
                            o.handleSearch(e)
                        }), n.on("open", function() {
                            o.$search.attr("tabindex", 0), o.$search.focus(), window.setTimeout(function() {
                                o.$search.focus()
                            }, 0)
                        }), n.on("close", function() {
                            o.$search.attr("tabindex", -1), o.$search.val("")
                        }), n.on("focus", function() {
                            n.isOpen() && o.$search.focus()
                        }), n.on("results:all", function(e) {
                            null != e.query.term && "" !== e.query.term || (o.showSearch(e) ? o.$searchContainer.removeClass("select2-search--hide") : o.$searchContainer.addClass("select2-search--hide"))
                        })
                    }, n.prototype.handleSearch = function(e) {
                        if (!this._keyUpPrevented) {
                            var t = this.$search.val();
                            this.trigger("query", {
                                term: t
                            })
                        }
                        this._keyUpPrevented = !1
                    }, n.prototype.showSearch = function(e, t) {
                        return !0
                    }, n
                }), t.define("select2/dropdown/hidePlaceholder", [], function() {
                    function e(e, t, n, i) {
                        this.placeholder = this.normalizePlaceholder(n.get("placeholder")), e.call(this, t, n, i)
                    }
                    return e.prototype.append = function(e, t) {
                        t.results = this.removePlaceholder(t.results), e.call(this, t)
                    }, e.prototype.normalizePlaceholder = function(e, t) {
                        return "string" == typeof t && (t = {
                            id: "",
                            text: t
                        }), t
                    }, e.prototype.removePlaceholder = function(e, t) {
                        for (var n = t.slice(0), i = t.length - 1; i >= 0; i--) {
                            var o = t[i];
                            this.placeholder.id === o.id && n.splice(i, 1)
                        }
                        return n
                    }, e
                }), t.define("select2/dropdown/infiniteScroll", ["jquery"], function(e) {
                    function t(e, t, n, i) {
                        this.lastParams = {}, e.call(this, t, n, i), this.$loadingMore = this.createLoadingMore(), this.loading = !1
                    }
                    return t.prototype.append = function(e, t) {
                        this.$loadingMore.remove(), this.loading = !1, e.call(this, t), this.showLoadingMore(t) && this.$results.append(this.$loadingMore)
                    }, t.prototype.bind = function(t, n, i) {
                        var o = this;
                        t.call(this, n, i), n.on("query", function(e) {
                            o.lastParams = e, o.loading = !0
                        }), n.on("query:append", function(e) {
                            o.lastParams = e, o.loading = !0
                        }), this.$results.on("scroll", function() {
                            var t = e.contains(document.documentElement, o.$loadingMore[0]);
                            !o.loading && t && o.$results.offset().top + o.$results.outerHeight(!1) + 50 >= o.$loadingMore.offset().top + o.$loadingMore.outerHeight(!1) && o.loadMore()
                        })
                    }, t.prototype.loadMore = function() {
                        this.loading = !0;
                        var t = e.extend({}, {
                            page: 1
                        }, this.lastParams);
                        t.page++, this.trigger("query:append", t)
                    }, t.prototype.showLoadingMore = function(e, t) {
                        return t.pagination && t.pagination.more
                    }, t.prototype.createLoadingMore = function() {
                        var t = e('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                            n = this.options.get("translations").get("loadingMore");
                        return t.html(n(this.lastParams)), t
                    }, t
                }), t.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(e, t) {
                    function n(t, n, i) {
                        this.$dropdownParent = i.get("dropdownParent") || e(document.body), t.call(this, n, i)
                    }
                    return n.prototype.bind = function(e, t, n) {
                        var i = this,
                            o = !1;
                        e.call(this, t, n), t.on("open", function() {
                            i._showDropdown(), i._attachPositioningHandler(t), o || (o = !0, t.on("results:all", function() {
                                i._positionDropdown(), i._resizeDropdown()
                            }), t.on("results:append", function() {
                                i._positionDropdown(), i._resizeDropdown()
                            }))
                        }), t.on("close", function() {
                            i._hideDropdown(), i._detachPositioningHandler(t)
                        }), this.$dropdownContainer.on("mousedown", function(e) {
                            e.stopPropagation()
                        })
                    }, n.prototype.destroy = function(e) {
                        e.call(this), this.$dropdownContainer.remove()
                    }, n.prototype.position = function(e, t, n) {
                        t.attr("class", n.attr("class")), t.removeClass("select2"), t.addClass("select2-container--open"), t.css({
                            position: "absolute",
                            top: -999999
                        }), this.$container = n
                    }, n.prototype.render = function(t) {
                        var n = e("<span></span>"),
                            i = t.call(this);
                        return n.append(i), this.$dropdownContainer = n, n
                    }, n.prototype._hideDropdown = function(e) {
                        this.$dropdownContainer.detach()
                    }, n.prototype._attachPositioningHandler = function(n, i) {
                        var o = this,
                            r = "scroll.select2." + i.id,
                            s = "resize.select2." + i.id,
                            a = "orientationchange.select2." + i.id,
                            l = this.$container.parents().filter(t.hasScroll);
                        l.each(function() {
                            e(this).data("select2-scroll-position", {
                                x: e(this).scrollLeft(),
                                y: e(this).scrollTop()
                            })
                        }), l.on(r, function(t) {
                            var n = e(this).data("select2-scroll-position");
                            e(this).scrollTop(n.y)
                        }), e(window).on(r + " " + s + " " + a, function(e) {
                            o._positionDropdown(), o._resizeDropdown()
                        })
                    }, n.prototype._detachPositioningHandler = function(n, i) {
                        var o = "scroll.select2." + i.id,
                            r = "resize.select2." + i.id,
                            s = "orientationchange.select2." + i.id;
                        this.$container.parents().filter(t.hasScroll).off(o), e(window).off(o + " " + r + " " + s)
                    }, n.prototype._positionDropdown = function() {
                        var t = e(window),
                            n = this.$dropdown.hasClass("select2-dropdown--above"),
                            i = this.$dropdown.hasClass("select2-dropdown--below"),
                            o = null,
                            r = this.$container.offset();
                        r.bottom = r.top + this.$container.outerHeight(!1);
                        var s = {
                            height: this.$container.outerHeight(!1)
                        };
                        s.top = r.top, s.bottom = r.top + s.height;
                        var a = {
                                height: this.$dropdown.outerHeight(!1)
                            },
                            l = {
                                top: t.scrollTop(),
                                bottom: t.scrollTop() + t.height()
                            },
                            c = l.top < r.top - a.height,
                            u = l.bottom > r.bottom + a.height,
                            d = {
                                left: r.left,
                                top: s.bottom
                            },
                            p = this.$dropdownParent;
                        "static" === p.css("position") && (p = p.offsetParent());
                        var h = p.offset();
                        d.top -= h.top, d.left -= h.left, n || i || (o = "below"), u || !c || n ? !c && u && n && (o = "below") : o = "above", ("above" == o || n && "below" !== o) && (d.top = s.top - h.top - a.height), null != o && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + o), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + o)), this.$dropdownContainer.css(d)
                    }, n.prototype._resizeDropdown = function() {
                        var e = {
                            width: this.$container.outerWidth(!1) + "px"
                        };
                        this.options.get("dropdownAutoWidth") && (e.minWidth = e.width, e.position = "relative", e.width = "auto"), this.$dropdown.css(e)
                    }, n.prototype._showDropdown = function(e) {
                        this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown()
                    }, n
                }), t.define("select2/dropdown/minimumResultsForSearch", [], function() {
                    function e(t) {
                        for (var n = 0, i = 0; i < t.length; i++) {
                            var o = t[i];
                            o.children ? n += e(o.children) : n++
                        }
                        return n
                    }

                    function t(e, t, n, i) {
                        this.minimumResultsForSearch = n.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), e.call(this, t, n, i)
                    }
                    return t.prototype.showSearch = function(t, n) {
                        return !(e(n.data.results) < this.minimumResultsForSearch) && t.call(this, n)
                    }, t
                }), t.define("select2/dropdown/selectOnClose", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, n) {
                        var i = this;
                        e.call(this, t, n), t.on("close", function(e) {
                            i._handleSelectOnClose(e)
                        })
                    }, e.prototype._handleSelectOnClose = function(e, t) {
                        if (t && null != t.originalSelect2Event) {
                            var n = t.originalSelect2Event;
                            if ("select" === n._type || "unselect" === n._type) return
                        }
                        var i = this.getHighlightedResults();
                        if (!(i.length < 1)) {
                            var o = i.data("data");
                            null != o.element && o.element.selected || null == o.element && o.selected || this.trigger("select", {
                                data: o
                            })
                        }
                    }, e
                }), t.define("select2/dropdown/closeOnSelect", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, n) {
                        var i = this;
                        e.call(this, t, n), t.on("select", function(e) {
                            i._selectTriggered(e)
                        }), t.on("unselect", function(e) {
                            i._selectTriggered(e)
                        })
                    }, e.prototype._selectTriggered = function(e, t) {
                        var n = t.originalEvent;
                        n && n.ctrlKey || this.trigger("close", {
                            originalEvent: n,
                            originalSelect2Event: t
                        })
                    }, e
                }), t.define("select2/i18n/en", [], function() {
                    return {
                        errorLoading: function() {
                            return "The results could not be loaded."
                        },
                        inputTooLong: function(e) {
                            var t = e.input.length - e.maximum,
                                n = "Please delete " + t + " character";
                            return 1 != t && (n += "s"), n
                        },
                        inputTooShort: function(e) {
                            return "Please enter " + (e.minimum - e.input.length) + " or more characters"
                        },
                        loadingMore: function() {
                            return "Loading more results…"
                        },
                        maximumSelected: function(e) {
                            var t = "You can only select " + e.maximum + " item";
                            return 1 != e.maximum && (t += "s"), t
                        },
                        noResults: function() {
                            return "No results found"
                        },
                        searching: function() {
                            return "Searching…"
                        }
                    }
                }), t.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function(e, t, n, i, o, r, s, a, l, c, u, d, p, h, f, g, m, v, y, _, w, $, b, x, A, C, S, O, E) {
                    function D() {
                        this.reset()
                    }
                    return D.prototype.apply = function(d) {
                        if (null == (d = e.extend(!0, {}, this.defaults, d)).dataAdapter) {
                            if (null != d.ajax ? d.dataAdapter = f : null != d.data ? d.dataAdapter = h : d.dataAdapter = p, d.minimumInputLength > 0 && (d.dataAdapter = c.Decorate(d.dataAdapter, v)), d.maximumInputLength > 0 && (d.dataAdapter = c.Decorate(d.dataAdapter, y)), d.maximumSelectionLength > 0 && (d.dataAdapter = c.Decorate(d.dataAdapter, _)), d.tags && (d.dataAdapter = c.Decorate(d.dataAdapter, g)), (null != d.tokenSeparators || null != d.tokenizer) && (d.dataAdapter = c.Decorate(d.dataAdapter, m)), null != d.query) {
                                var E = t(d.amdBase + "compat/query");
                                d.dataAdapter = c.Decorate(d.dataAdapter, E)
                            }
                            if (null != d.initSelection) {
                                var D = t(d.amdBase + "compat/initSelection");
                                d.dataAdapter = c.Decorate(d.dataAdapter, D)
                            }
                        }
                        if (null == d.resultsAdapter && (d.resultsAdapter = n, null != d.ajax && (d.resultsAdapter = c.Decorate(d.resultsAdapter, x)), null != d.placeholder && (d.resultsAdapter = c.Decorate(d.resultsAdapter, b)), d.selectOnClose && (d.resultsAdapter = c.Decorate(d.resultsAdapter, S))), null == d.dropdownAdapter) {
                            if (d.multiple) d.dropdownAdapter = w;
                            else {
                                var T = c.Decorate(w, $);
                                d.dropdownAdapter = T
                            }
                            if (0 !== d.minimumResultsForSearch && (d.dropdownAdapter = c.Decorate(d.dropdownAdapter, C)), d.closeOnSelect && (d.dropdownAdapter = c.Decorate(d.dropdownAdapter, O)), null != d.dropdownCssClass || null != d.dropdownCss || null != d.adaptDropdownCssClass) {
                                var q = t(d.amdBase + "compat/dropdownCss");
                                d.dropdownAdapter = c.Decorate(d.dropdownAdapter, q)
                            }
                            d.dropdownAdapter = c.Decorate(d.dropdownAdapter, A)
                        }
                        if (null == d.selectionAdapter) {
                            if (d.multiple ? d.selectionAdapter = o : d.selectionAdapter = i, null != d.placeholder && (d.selectionAdapter = c.Decorate(d.selectionAdapter, r)), d.allowClear && (d.selectionAdapter = c.Decorate(d.selectionAdapter, s)), d.multiple && (d.selectionAdapter = c.Decorate(d.selectionAdapter, a)), null != d.containerCssClass || null != d.containerCss || null != d.adaptContainerCssClass) {
                                var j = t(d.amdBase + "compat/containerCss");
                                d.selectionAdapter = c.Decorate(d.selectionAdapter, j)
                            }
                            d.selectionAdapter = c.Decorate(d.selectionAdapter, l)
                        }
                        if ("string" == typeof d.language)
                            if (d.language.indexOf("-") > 0) {
                                var L = d.language.split("-")[0];
                                d.language = [d.language, L]
                            } else d.language = [d.language];
                        if (e.isArray(d.language)) {
                            var k = new u;
                            d.language.push("en");
                            for (var P = d.language, I = 0; I < P.length; I++) {
                                var M = P[I],
                                    R = {};
                                try {
                                    R = u.loadPath(M)
                                } catch (e) {
                                    try {
                                        M = this.defaults.amdLanguageBase + M, R = u.loadPath(M)
                                    } catch (e) {
                                        d.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.');
                                        continue
                                    }
                                }
                                k.extend(R)
                            }
                            d.translations = k
                        } else {
                            var z = u.loadPath(this.defaults.amdLanguageBase + "en"),
                                H = new u(d.language);
                            H.extend(z), d.translations = H
                        }
                        return d
                    }, D.prototype.reset = function() {
                        function t(e) {
                            return e.replace(/[^\u0000-\u007E]/g, function(e) {
                                return d[e] || e
                            })
                        }

                        function n(i, o) {
                            if ("" === e.trim(i.term)) return o;
                            if (o.children && o.children.length > 0) {
                                for (var r = e.extend(!0, {}, o), s = o.children.length - 1; s >= 0; s--) null == n(i, o.children[s]) && r.children.splice(s, 1);
                                return r.children.length > 0 ? r : n(i, r)
                            }
                            var a = t(o.text).toUpperCase(),
                                l = t(i.term).toUpperCase();
                            return a.indexOf(l) > -1 ? o : null
                        }
                        this.defaults = {
                            amdBase: "./",
                            amdLanguageBase: "./i18n/",
                            closeOnSelect: !0,
                            debug: !1,
                            dropdownAutoWidth: !1,
                            escapeMarkup: c.escapeMarkup,
                            language: E,
                            matcher: n,
                            minimumInputLength: 0,
                            maximumInputLength: 0,
                            maximumSelectionLength: 0,
                            minimumResultsForSearch: 0,
                            selectOnClose: !1,
                            sorter: function(e) {
                                return e
                            },
                            templateResult: function(e) {
                                return e.text
                            },
                            templateSelection: function(e) {
                                return e.text
                            },
                            theme: "default",
                            width: "resolve"
                        }
                    }, D.prototype.set = function(t, n) {
                        var i = {};
                        i[e.camelCase(t)] = n;
                        var o = c._convertData(i);
                        e.extend(this.defaults, o)
                    }, new D
                }), t.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function(e, t, n, i) {
                    function o(t, o) {
                        if (this.options = t, null != o && this.fromElement(o), this.options = n.apply(this.options), o && o.is("input")) {
                            var r = e(this.get("amdBase") + "compat/inputData");
                            this.options.dataAdapter = i.Decorate(this.options.dataAdapter, r)
                        }
                    }
                    return o.prototype.fromElement = function(e) {
                        var n = ["select2"];
                        null == this.options.multiple && (this.options.multiple = e.prop("multiple")), null == this.options.disabled && (this.options.disabled = e.prop("disabled")), null == this.options.language && (e.prop("lang") ? this.options.language = e.prop("lang").toLowerCase() : e.closest("[lang]").prop("lang") && (this.options.language = e.closest("[lang]").prop("lang"))), null == this.options.dir && (e.prop("dir") ? this.options.dir = e.prop("dir") : e.closest("[dir]").prop("dir") ? this.options.dir = e.closest("[dir]").prop("dir") : this.options.dir = "ltr"), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), e.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), e.data("data", e.data("select2Tags")), e.data("tags", !0)), e.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), e.attr("ajax--url", e.data("ajaxUrl")), e.data("ajax--url", e.data("ajaxUrl")));
                        var o = {};
                        o = t.fn.jquery && "1." == t.fn.jquery.substr(0, 2) && e[0].dataset ? t.extend(!0, {}, e[0].dataset, e.data()) : e.data();
                        var r = t.extend(!0, {}, o);
                        r = i._convertData(r);
                        for (var s in r) t.inArray(s, n) > -1 || (t.isPlainObject(this.options[s]) ? t.extend(this.options[s], r[s]) : this.options[s] = r[s]);
                        return this
                    }, o.prototype.get = function(e) {
                        return this.options[e]
                    }, o.prototype.set = function(e, t) {
                        this.options[e] = t
                    }, o
                }), t.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(e, t, n, i) {
                    var o = function(e, n) {
                        null != e.data("select2") && e.data("select2").destroy(), this.$element = e, this.id = this._generateId(e), n = n || {}, this.options = new t(n, e), o.__super__.constructor.call(this);
                        var i = e.attr("tabindex") || 0;
                        e.data("old-tabindex", i), e.attr("tabindex", "-1");
                        var r = this.options.get("dataAdapter");
                        this.dataAdapter = new r(e, this.options);
                        var s = this.render();
                        this._placeContainer(s);
                        var a = this.options.get("selectionAdapter");
                        this.selection = new a(e, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, s);
                        var l = this.options.get("dropdownAdapter");
                        this.dropdown = new l(e, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, s);
                        var c = this.options.get("resultsAdapter");
                        this.results = new c(e, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                        var u = this;
                        this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function(e) {
                            u.trigger("selection:update", {
                                data: e
                            })
                        }), e.addClass("select2-hidden-accessible"), e.attr("aria-hidden", "true"), this._syncAttributes(), e.data("select2", this)
                    };
                    return n.Extend(o, n.Observable), o.prototype._generateId = function(e) {
                        var t = "";
                        return t = null != e.attr("id") ? e.attr("id") : null != e.attr("name") ? e.attr("name") + "-" + n.generateChars(2) : n.generateChars(4), t = t.replace(/(:|\.|\[|\]|,)/g, ""), t = "select2-" + t
                    }, o.prototype._placeContainer = function(e) {
                        e.insertAfter(this.$element);
                        var t = this._resolveWidth(this.$element, this.options.get("width"));
                        null != t && e.css("width", t)
                    }, o.prototype._resolveWidth = function(e, t) {
                        var n = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                        if ("resolve" == t) {
                            var i = this._resolveWidth(e, "style");
                            return null != i ? i : this._resolveWidth(e, "element")
                        }
                        if ("element" == t) {
                            var o = e.outerWidth(!1);
                            return 0 >= o ? "auto" : o + "px"
                        }
                        if ("style" == t) {
                            var r = e.attr("style");
                            if ("string" != typeof r) return null;
                            for (var s = r.split(";"), a = 0, l = s.length; l > a; a += 1) {
                                var c = s[a].replace(/\s/g, "").match(n);
                                if (null !== c && c.length >= 1) return c[1]
                            }
                            return null
                        }
                        return t
                    }, o.prototype._bindAdapters = function() {
                        this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container)
                    }, o.prototype._registerDomEvents = function() {
                        var t = this;
                        this.$element.on("change.select2", function() {
                            t.dataAdapter.current(function(e) {
                                t.trigger("selection:update", {
                                    data: e
                                })
                            })
                        }), this.$element.on("focus.select2", function(e) {
                            t.trigger("focus", e)
                        }), this._syncA = n.bind(this._syncAttributes, this), this._syncS = n.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
                        var i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                        null != i ? (this._observer = new i(function(n) {
                            e.each(n, t._syncA), e.each(n, t._syncS)
                        }), this._observer.observe(this.$element[0], {
                            attributes: !0,
                            childList: !0,
                            subtree: !1
                        })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", t._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", t._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", t._syncS, !1))
                    }, o.prototype._registerDataEvents = function() {
                        var e = this;
                        this.dataAdapter.on("*", function(t, n) {
                            e.trigger(t, n)
                        })
                    }, o.prototype._registerSelectionEvents = function() {
                        var t = this,
                            n = ["toggle", "focus"];
                        this.selection.on("toggle", function() {
                            t.toggleDropdown()
                        }), this.selection.on("focus", function(e) {
                            t.focus(e)
                        }), this.selection.on("*", function(i, o) {
                            -1 === e.inArray(i, n) && t.trigger(i, o)
                        })
                    }, o.prototype._registerDropdownEvents = function() {
                        var e = this;
                        this.dropdown.on("*", function(t, n) {
                            e.trigger(t, n)
                        })
                    }, o.prototype._registerResultsEvents = function() {
                        var e = this;
                        this.results.on("*", function(t, n) {
                            e.trigger(t, n)
                        })
                    }, o.prototype._registerEvents = function() {
                        var e = this;
                        this.on("open", function() {
                            e.$container.addClass("select2-container--open")
                        }), this.on("close", function() {
                            e.$container.removeClass("select2-container--open")
                        }), this.on("enable", function() {
                            e.$container.removeClass("select2-container--disabled")
                        }), this.on("disable", function() {
                            e.$container.addClass("select2-container--disabled")
                        }), this.on("blur", function() {
                            e.$container.removeClass("select2-container--focus")
                        }), this.on("query", function(t) {
                            e.isOpen() || e.trigger("open", {}), this.dataAdapter.query(t, function(n) {
                                e.trigger("results:all", {
                                    data: n,
                                    query: t
                                })
                            })
                        }), this.on("query:append", function(t) {
                            this.dataAdapter.query(t, function(n) {
                                e.trigger("results:append", {
                                    data: n,
                                    query: t
                                })
                            })
                        }), this.on("keypress", function(t) {
                            var n = t.which;
                            e.isOpen() ? n === i.ESC || n === i.TAB || n === i.UP && t.altKey ? (e.close(), t.preventDefault()) : n === i.ENTER ? (e.trigger("results:select", {}), t.preventDefault()) : n === i.SPACE && t.ctrlKey ? (e.trigger("results:toggle", {}), t.preventDefault()) : n === i.UP ? (e.trigger("results:previous", {}), t.preventDefault()) : n === i.DOWN && (e.trigger("results:next", {}), t.preventDefault()) : (n === i.ENTER || n === i.SPACE || n === i.DOWN && t.altKey) && (e.open(), t.preventDefault())
                        })
                    }, o.prototype._syncAttributes = function() {
                        this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {})
                    }, o.prototype._syncSubtree = function(e, t) {
                        var n = !1,
                            i = this;
                        if (!e || !e.target || "OPTION" === e.target.nodeName || "OPTGROUP" === e.target.nodeName) {
                            if (t)
                                if (t.addedNodes && t.addedNodes.length > 0)
                                    for (var o = 0; o < t.addedNodes.length; o++) t.addedNodes[o].selected && (n = !0);
                                else t.removedNodes && t.removedNodes.length > 0 && (n = !0);
                            else n = !0;
                            n && this.dataAdapter.current(function(e) {
                                i.trigger("selection:update", {
                                    data: e
                                })
                            })
                        }
                    }, o.prototype.trigger = function(e, t) {
                        var n = o.__super__.trigger,
                            i = {
                                open: "opening",
                                close: "closing",
                                select: "selecting",
                                unselect: "unselecting"
                            };
                        if (void 0 === t && (t = {}), e in i) {
                            var r = i[e],
                                s = {
                                    prevented: !1,
                                    name: e,
                                    args: t
                                };
                            if (n.call(this, r, s), s.prevented) return void(t.prevented = !0)
                        }
                        n.call(this, e, t)
                    }, o.prototype.toggleDropdown = function() {
                        this.options.get("disabled") || (this.isOpen() ? this.close() : this.open())
                    }, o.prototype.open = function() {
                        this.isOpen() || this.trigger("query", {})
                    }, o.prototype.close = function() {
                        this.isOpen() && this.trigger("close", {})
                    }, o.prototype.isOpen = function() {
                        return this.$container.hasClass("select2-container--open")
                    }, o.prototype.hasFocus = function() {
                        return this.$container.hasClass("select2-container--focus")
                    }, o.prototype.focus = function(e) {
                        this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}))
                    }, o.prototype.enable = function(e) {
                        this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (null == e || 0 === e.length) && (e = [!0]);
                        var t = !e[0];
                        this.$element.prop("disabled", t)
                    }, o.prototype.data = function() {
                        this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                        var e = [];
                        return this.dataAdapter.current(function(t) {
                            e = t
                        }), e
                    }, o.prototype.val = function(t) {
                        if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == t || 0 === t.length) return this.$element.val();
                        var n = t[0];
                        e.isArray(n) && (n = e.map(n, function(e) {
                            return e.toString()
                        })), this.$element.val(n).trigger("change")
                    }, o.prototype.destroy = function() {
                        this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null
                    }, o.prototype.render = function() {
                        var t = e('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                        return t.attr("dir", this.options.get("dir")), this.$container = t, this.$container.addClass("select2-container--" + this.options.get("theme")), t.data("element", this.$element), t
                    }, o
                }), t.define("select2/compat/utils", ["jquery"], function(e) {
                    return {
                        syncCssClasses: function(t, n, i) {
                            var o, r, s = [];
                            (o = e.trim(t.attr("class"))) && (o = "" + o, e(o.split(/\s+/)).each(function() {
                                0 === this.indexOf("select2-") && s.push(this)
                            })), (o = e.trim(n.attr("class"))) && (o = "" + o, e(o.split(/\s+/)).each(function() {
                                0 !== this.indexOf("select2-") && null != (r = i(this)) && s.push(r)
                            })), t.attr("class", s.join(" "))
                        }
                    }
                }), t.define("select2/compat/containerCss", ["jquery", "./utils"], function(e, t) {
                    function n(e) {
                        return null
                    }

                    function i() {}
                    return i.prototype.render = function(i) {
                        var o = i.call(this),
                            r = this.options.get("containerCssClass") || "";
                        e.isFunction(r) && (r = r(this.$element));
                        var s = this.options.get("adaptContainerCssClass");
                        if (s = s || n, -1 !== r.indexOf(":all:")) {
                            r = r.replace(":all:", "");
                            var a = s;
                            s = function(e) {
                                var t = a(e);
                                return null != t ? t + " " + e : e
                            }
                        }
                        var l = this.options.get("containerCss") || {};
                        return e.isFunction(l) && (l = l(this.$element)), t.syncCssClasses(o, this.$element, s), o.css(l), o.addClass(r), o
                    }, i
                }), t.define("select2/compat/dropdownCss", ["jquery", "./utils"], function(e, t) {
                    function n(e) {
                        return null
                    }

                    function i() {}
                    return i.prototype.render = function(i) {
                        var o = i.call(this),
                            r = this.options.get("dropdownCssClass") || "";
                        e.isFunction(r) && (r = r(this.$element));
                        var s = this.options.get("adaptDropdownCssClass");
                        if (s = s || n, -1 !== r.indexOf(":all:")) {
                            r = r.replace(":all:", "");
                            var a = s;
                            s = function(e) {
                                var t = a(e);
                                return null != t ? t + " " + e : e
                            }
                        }
                        var l = this.options.get("dropdownCss") || {};
                        return e.isFunction(l) && (l = l(this.$element)), t.syncCssClasses(o, this.$element, s), o.css(l), o.addClass(r), o
                    }, i
                }), t.define("select2/compat/initSelection", ["jquery"], function(e) {
                    function t(e, t, n) {
                        n.get("debug") && window.console && console.warn && console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"), this.initSelection = n.get("initSelection"), this._isInitialized = !1, e.call(this, t, n)
                    }
                    return t.prototype.current = function(t, n) {
                        var i = this;
                        return this._isInitialized ? void t.call(this, n) : void this.initSelection.call(null, this.$element, function(t) {
                            i._isInitialized = !0, e.isArray(t) || (t = [t]), n(t)
                        })
                    }, t
                }), t.define("select2/compat/inputData", ["jquery"], function(e) {
                    function t(e, t, n) {
                        this._currentData = [], this._valueSeparator = n.get("valueSeparator") || ",", "hidden" === t.prop("type") && n.get("debug") && console && console.warn && console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."), e.call(this, t, n)
                    }
                    return t.prototype.current = function(t, n) {
                        function i(t, n) {
                            var o = [];
                            return t.selected || -1 !== e.inArray(t.id, n) ? (t.selected = !0, o.push(t)) : t.selected = !1, t.children && o.push.apply(o, i(t.children, n)), o
                        }
                        for (var o = [], r = 0; r < this._currentData.length; r++) {
                            var s = this._currentData[r];
                            o.push.apply(o, i(s, this.$element.val().split(this._valueSeparator)))
                        }
                        n(o)
                    }, t.prototype.select = function(t, n) {
                        if (this.options.get("multiple")) {
                            var i = this.$element.val();
                            i += this._valueSeparator + n.id, this.$element.val(i), this.$element.trigger("change")
                        } else this.current(function(t) {
                            e.map(t, function(e) {
                                e.selected = !1
                            })
                        }), this.$element.val(n.id), this.$element.trigger("change")
                    }, t.prototype.unselect = function(e, t) {
                        var n = this;
                        t.selected = !1, this.current(function(e) {
                            for (var i = [], o = 0; o < e.length; o++) {
                                var r = e[o];
                                t.id != r.id && i.push(r.id)
                            }
                            n.$element.val(i.join(n._valueSeparator)), n.$element.trigger("change")
                        })
                    }, t.prototype.query = function(e, t, n) {
                        for (var i = [], o = 0; o < this._currentData.length; o++) {
                            var r = this._currentData[o],
                                s = this.matches(t, r);
                            null !== s && i.push(s)
                        }
                        n({
                            results: i
                        })
                    }, t.prototype.addOptions = function(t, n) {
                        var i = e.map(n, function(t) {
                            return e.data(t[0], "data")
                        });
                        this._currentData.push.apply(this._currentData, i)
                    }, t
                }), t.define("select2/compat/matcher", ["jquery"], function(e) {
                    return function(t) {
                        return function(n, i) {
                            var o = e.extend(!0, {}, i);
                            if (null == n.term || "" === e.trim(n.term)) return o;
                            if (i.children) {
                                for (var r = i.children.length - 1; r >= 0; r--) {
                                    var s = i.children[r];
                                    t(n.term, s.text, s) || o.children.splice(r, 1)
                                }
                                if (o.children.length > 0) return o
                            }
                            return t(n.term, i.text, i) ? o : null
                        }
                    }
                }), t.define("select2/compat/query", [], function() {
                    function e(e, t, n) {
                        n.get("debug") && window.console && console.warn && console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."), e.call(this, t, n)
                    }
                    return e.prototype.query = function(e, t, n) {
                        t.callback = n, this.options.get("query").call(null, t)
                    }, e
                }), t.define("select2/dropdown/attachContainer", [], function() {
                    function e(e, t, n) {
                        e.call(this, t, n)
                    }
                    return e.prototype.position = function(e, t, n) {
                        n.find(".dropdown-wrapper").append(t), t.addClass("select2-dropdown--below"), n.addClass("select2-container--below")
                    }, e
                }), t.define("select2/dropdown/stopPropagation", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, n) {
                        e.call(this, t, n);
                        var i = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
                        this.$dropdown.on(i.join(" "), function(e) {
                            e.stopPropagation()
                        })
                    }, e
                }), t.define("select2/selection/stopPropagation", [], function() {
                    function e() {}
                    return e.prototype.bind = function(e, t, n) {
                        e.call(this, t, n);
                        var i = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
                        this.$selection.on(i.join(" "), function(e) {
                            e.stopPropagation()
                        })
                    }, e
                }),
                function(n) {
                    "function" == typeof t.define && t.define.amd ? t.define("jquery-mousewheel", ["jquery"], n) : "object" == typeof exports ? module.exports = n : n(e)
                }(function(e) {
                    function t(t) {
                        var s = t || window.event,
                            a = l.call(arguments, 1),
                            c = 0,
                            d = 0,
                            p = 0,
                            h = 0,
                            f = 0,
                            g = 0;
                        if (t = e.event.fix(s), t.type = "mousewheel", "detail" in s && (p = -1 * s.detail), "wheelDelta" in s && (p = s.wheelDelta), "wheelDeltaY" in s && (p = s.wheelDeltaY), "wheelDeltaX" in s && (d = -1 * s.wheelDeltaX), "axis" in s && s.axis === s.HORIZONTAL_AXIS && (d = -1 * p, p = 0), c = 0 === p ? d : p, "deltaY" in s && (p = -1 * s.deltaY, c = p), "deltaX" in s && (d = s.deltaX, 0 === p && (c = -1 * d)), 0 !== p || 0 !== d) {
                            if (1 === s.deltaMode) {
                                var m = e.data(this, "mousewheel-line-height");
                                c *= m, p *= m, d *= m
                            } else if (2 === s.deltaMode) {
                                var v = e.data(this, "mousewheel-page-height");
                                c *= v, p *= v, d *= v
                            }
                            if (h = Math.max(Math.abs(p), Math.abs(d)), (!r || r > h) && (r = h, i(s, h) && (r /= 40)), i(s, h) && (c /= 40, d /= 40, p /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / r), d = Math[d >= 1 ? "floor" : "ceil"](d / r), p = Math[p >= 1 ? "floor" : "ceil"](p / r), u.settings.normalizeOffset && this.getBoundingClientRect) {
                                var y = this.getBoundingClientRect();
                                f = t.clientX - y.left, g = t.clientY - y.top
                            }
                            return t.deltaX = d, t.deltaY = p, t.deltaFactor = r, t.offsetX = f, t.offsetY = g, t.deltaMode = 0, a.unshift(t, c, d, p), o && clearTimeout(o), o = setTimeout(n, 200), (e.event.dispatch || e.event.handle).apply(this, a)
                        }
                    }

                    function n() {
                        r = null
                    }

                    function i(e, t) {
                        return u.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
                    }
                    var o, r, s = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                        a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                        l = Array.prototype.slice;
                    if (e.event.fixHooks)
                        for (var c = s.length; c;) e.event.fixHooks[s[--c]] = e.event.mouseHooks;
                    var u = e.event.special.mousewheel = {
                        version: "3.1.12",
                        setup: function() {
                            if (this.addEventListener)
                                for (var n = a.length; n;) this.addEventListener(a[--n], t, !1);
                            else this.onmousewheel = t;
                            e.data(this, "mousewheel-line-height", u.getLineHeight(this)), e.data(this, "mousewheel-page-height", u.getPageHeight(this))
                        },
                        teardown: function() {
                            if (this.removeEventListener)
                                for (var n = a.length; n;) this.removeEventListener(a[--n], t, !1);
                            else this.onmousewheel = null;
                            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
                        },
                        getLineHeight: function(t) {
                            var n = e(t),
                                i = n["offsetParent" in e.fn ? "offsetParent" : "parent"]();
                            return i.length || (i = e("body")), parseInt(i.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
                        },
                        getPageHeight: function(t) {
                            return e(t).height()
                        },
                        settings: {
                            adjustOldDeltas: !0,
                            normalizeOffset: !0
                        }
                    };
                    e.fn.extend({
                        mousewheel: function(e) {
                            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
                        },
                        unmousewheel: function(e) {
                            return this.unbind("mousewheel", e)
                        }
                    })
                }), t.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function(e, t, n, i) {
                    if (null == e.fn.select2) {
                        var o = ["open", "close", "destroy"];
                        e.fn.select2 = function(t) {
                            if ("object" == typeof(t = t || {})) return this.each(function() {
                                var i = e.extend(!0, {}, t);
                                new n(e(this), i)
                            }), this;
                            if ("string" == typeof t) {
                                var i, r = Array.prototype.slice.call(arguments, 1);
                                return this.each(function() {
                                    var n = e(this).data("select2");
                                    null == n && window.console && console.error && console.error("The select2('" + t + "') method was called on an element that is not using Select2."), i = n[t].apply(n, r)
                                }), e.inArray(t, o) > -1 ? this : i
                            }
                            throw new Error("Invalid arguments for Select2: " + t)
                        }
                    }
                    return null == e.fn.select2.defaults && (e.fn.select2.defaults = i), n
                }), {
                    define: t.define,
                    require: t.require
                }
        }(),
        n = t.require("jquery.select2");
    return e.fn.select2.amd = t, n
});
! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.pickmeup = t()
}(this, function() {
    function e(e, t, a) {
        if (a = a || [], e instanceof Element) t.apply(t, [e].concat(a));
        else {
            var n, i;
            for (n = e.length, i = 0; i < n; ++i) t.apply(t, [e[i]].concat(a))
        }
    }

    function t(t) {
        e(t, function(e) {
            e.parentElement.removeChild(e)
        })
    }

    function a(e, t) {
        do {
            e = e.parentElement
        } while (e && !n(e, t));
        return e
    }

    function n(e, t) {
        return (e.matches || e.webkitMatchesSelector || e.msMatchesSelector).call(e, t)
    }

    function i(e, t) {
        return e && e.classList.contains(t)
    }

    function o(e, t) {
        e.classList.add(t)
    }

    function r(e, t, a, n) {
        if (-1 !== a.indexOf(" ")) {
            var i, o = (a = a.split(" ")).length;
            for (i = 0; i < o; ++i) r(e, t, a[i], n)
        } else e.__pickmeup.events.push([t, a, n]), t.addEventListener(a, n)
    }

    function s(e, t, a, n) {
        var i, o, r;
        if (a && -1 !== a.indexOf(" "))
            for (i = a.split(" "), o = i.length, r = 0; r < o; ++r) s(e, t, i[r], n);
        else
            for (i = e.__pickmeup.events, o = i.length, r = 0; r < o; ++r) t && t != i[r][0] || a && a != i[r][1] || n && n != i[r][2] || i[r][0].removeEventListener(i[r][1], i[r][2])
    }

    function u(e) {
        return e = e.getBoundingClientRect(), {
            top: e.top + window.pageYOffset - document.documentElement.clientTop,
            left: e.left + window.pageXOffset - document.documentElement.clientLeft
        }
    }

    function l(e, t, a) {
        var n = document.createEvent("Event");
        return a && (n.detail = a), n.initEvent("pickmeup-" + t, !1, !0), e.dispatchEvent(n)
    }

    function d(e) {
        for (var t = 28, a = (e = new Date(e)).getMonth(); e.getMonth() == a;) ++t, e.setDate(t);
        return t - 1
    }

    function c(e, t) {
        e.setDate(e.getDate() + t)
    }

    function m(e, t) {
        var a = e.getDate();
        e.setDate(1), e.setMonth(e.getMonth() + t), e.setDate(Math.min(a, d(e)))
    }

    function p(e, t) {
        var a = e.getDate();
        e.setDate(1), e.setFullYear(e.getFullYear() + t), e.setDate(Math.min(a, d(e)))
    }

    function f(e) {
        var a, n, r, s, u, d = e.__pickmeup.element,
            f = e.__pickmeup.options,
            h = Math.floor(f.calendars / 2),
            w = f.date,
            g = f.current,
            y = f.min ? new Date(f.min) : null,
            b = f.max ? new Date(f.max) : null;
        y && (y.setDate(1), m(y, 1), c(y, -1)), b && (b.setDate(1), m(b, 1), c(b, -1)), t(Array.prototype.slice.call(d.querySelectorAll(".pmu-instance > :not(nav)")));
        for (var k = 0; k < f.calendars; k++)
            if (a = new Date(g), v(a), r = Array.prototype.slice.call(d.querySelectorAll(".pmu-instance"))[k], i(d, "pmu-view-years") ? (p(a, 12 * (k - h)), n = a.getFullYear() - 6 + " - " + (a.getFullYear() + 5)) : i(d, "pmu-view-months") ? (p(a, k - h), n = a.getFullYear()) : i(d, "pmu-view-days") && (m(a, k - h), n = _(a, f.title_format, f.locales[f.locale])), !u && b && (u = new Date(a), f.select_day ? m(u, f.calendars - 1) : f.select_month ? p(u, f.calendars - 1) : p(u, 12 * (f.calendars - 1)), u > b)) --k, m(g, -1), u = void 0;
            else if (u = new Date(a), !s && ((s = new Date(a)).setDate(1), m(s, 1), c(s, -1), y && y > s)) --k, m(g, 1), s = void 0;
        else {
            r.querySelector(".pmu-month").textContent = n;
            var D = function(e) {
                    return "range" == f.mode && e >= new Date(w[0]).getFullYear() && e <= new Date(w[1]).getFullYear() || "multiple" == f.mode && -1 !== w.reduce(function(e, t) {
                        return e.push(new Date(t).getFullYear()), e
                    }, []).indexOf(e) || new Date(w).getFullYear() == e
                },
                M = function(e, t) {
                    var a = new Date(w[0]).getFullYear(),
                        n = new Date(w[1]).getFullYear(),
                        i = new Date(w[0]).getMonth(),
                        o = new Date(w[1]).getMonth();
                    return "range" == f.mode && (e > a && e < n || e > a && e == n && t <= o || e == a && e < n && t >= i || e == a && e == n && t >= i && t <= o) || "multiple" == f.mode && -1 !== w.reduce(function(e, t) {
                        return t = new Date(t), e.push(t.getFullYear() + "-" + t.getMonth()), e
                    }, []).indexOf(e + "-" + t) || new Date(w).getFullYear() == e && new Date(w).getMonth() == t
                };
            ! function() {
                var e, t, n, i = [],
                    s = a.getFullYear() - 6,
                    u = new Date(f.min).getFullYear(),
                    l = new Date(f.max).getFullYear();
                for (n = 0; 12 > n; ++n) e = s + n, t = document.createElement("div"), t.textContent = e, t.__pickmeup_year = e, f.min && e < u || f.max && e > l ? o(t, "pmu-disabled") : D(e) && o(t, "pmu-selected"), i.push(t);
                r.appendChild(f.instance_content_template(i, "pmu-years"))
            }(),
            function() {
                var e, t, n = [],
                    i = a.getFullYear(),
                    s = new Date(f.min).getFullYear(),
                    u = new Date(f.min).getMonth(),
                    l = new Date(f.max).getFullYear(),
                    d = new Date(f.max).getMonth();
                for (e = 0; 12 > e; ++e) t = document.createElement("div"), t.textContent = f.locales[f.locale].monthsShort[e], t.__pickmeup_month = e, t.__pickmeup_year = i, f.min && (i < s || e < u && i == s) || f.max && (i > l || e > d && i >= l) ? o(t, "pmu-disabled") : M(i, e) && o(t, "pmu-selected"), n.push(t);
                r.appendChild(f.instance_content_template(n, "pmu-months"))
            }(),
            function() {
                var e, t, n, i, s, u = [],
                    l = a.getMonth(),
                    d = v(new Date).valueOf();
                for (function() {
                        a.setDate(1);
                        var e = (a.getDay() - f.first_day) % 7;
                        c(a, -(e + (0 > e ? 7 : 0)))
                    }(), e = 0; 42 > e; ++e) t = document.createElement("div"), t.textContent = a.getDate(), t.__pickmeup_day = a.getDate(), t.__pickmeup_month = a.getMonth(), t.__pickmeup_year = a.getFullYear(), l != a.getMonth() && o(t, "pmu-not-in-month"), 0 == a.getDay() ? o(t, "pmu-sunday") : 6 == a.getDay() && o(t, "pmu-saturday"), n = f.render(new Date(a)) || {}, i = a.valueOf(), s = f.min && f.min > a || f.max && f.max < a, selected = f.date.valueOf() == i || f.date instanceof Array && f.date.reduce(function(e, t) {
                    return e || i === t.valueOf()
                }, !1) || "range" == f.mode && i >= f.date[0] && i <= f.date[1], n.disabled || !("disabled" in n) && s ? o(t, "pmu-disabled") : (n.selected || !("selected" in n) && selected) && o(t, "pmu-selected"), i == d && o(t, "pmu-today"), n.class_name && n.class_name.split(" ").forEach(o.bind(t, t)), u.push(t), c(a, 1);
                r.appendChild(f.instance_content_template(u, "pmu-days"))
            }()
        }
        s.setDate(1), u.setDate(1), m(u, 1), c(u, -1), h = d.querySelector(".pmu-prev"), d = d.querySelector(".pmu-next"), h && (h.style.visibility = f.min && f.min >= s ? "hidden" : "visible"), d && (d.style.visibility = f.max && f.max <= u ? "hidden" : "visible"), l(e, "fill")
    }

    function h(e, t) {
        var a = t.format,
            n = t.separator,
            i = t.locales[t.locale];
        if (e instanceof Date || e instanceof Number) return v(new Date(e));
        if (!e) return v(new Date);
        if (e instanceof Array) {
            for (e = e.slice(), a = 0; a < e.length; ++a) e[a] = h(e[a], t);
            return e
        }
        if (1 < (n = e.split(n)).length) return n.forEach(function(e, a, n) {
            n[a] = h(e.trim(), t)
        }), n;
        n = i.monthsShort.join(")(") + ")(" + i.months.join(")("), n = new RegExp("[^0-9a-zA-Z(" + n + ")]+"), e = e.split(n);
        for (var o, r, s, u, l, n = a.split(n), d = new Date, a = 0; a < e.length; a++) switch (n[a]) {
            case "b":
                r = i.monthsShort.indexOf(e[a]);
                break;
            case "B":
                r = i.months.indexOf(e[a]);
                break;
            case "d":
            case "e":
                o = parseInt(e[a], 10);
                break;
            case "m":
                r = parseInt(e[a], 10) - 1;
                break;
            case "Y":
            case "y":
                s = parseInt(e[a], 10), s += 100 < s ? 0 : 29 > s ? 2e3 : 1900;
                break;
            case "H":
            case "I":
            case "k":
            case "l":
                u = parseInt(e[a], 10);
                break;
            case "P":
            case "p":
                /pm/i.test(e[a]) && 12 > u ? u += 12 : /am/i.test(e[a]) && 12 <= u && (u -= 12);
                break;
            case "M":
                l = parseInt(e[a], 10)
        }
        return i = new Date(void 0 === s ? d.getFullYear() : s, void 0 === r ? d.getMonth() : r, void 0 === o ? d.getDate() : o, void 0 === u ? d.getHours() : u, void 0 === l ? d.getMinutes() : l, 0), isNaN(1 * i) && (i = new Date), v(i)
    }

    function v(e) {
        return e.setHours(0, 0, 0, 0), e
    }

    function _(e, t, a) {
        var n, i = e.getMonth(),
            o = e.getDate(),
            r = e.getFullYear(),
            s = e.getDay(),
            u = e.getHours(),
            l = 12 <= u,
            d = l ? u - 12 : u;
        n = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0);
        c = new Date(e.getFullYear(), 0, 0, 0, 0, 0);
        n = Math.floor((n - c) / 24 * 36e5), 0 == d && (d = 12);
        var c = e.getMinutes(),
            m = e.getSeconds();
        t = t.split("");
        for (var p, f = 0; f < t.length; f++) {
            switch (p = t[f]) {
                case "a":
                    p = a.daysShort[s];
                    break;
                case "A":
                    p = a.days[s];
                    break;
                case "b":
                    p = a.monthsShort[i];
                    break;
                case "B":
                    p = a.months[i];
                    break;
                case "C":
                    p = 1 + Math.floor(r / 100);
                    break;
                case "d":
                    p = 10 > o ? "0" + o : o;
                    break;
                case "e":
                    p = o;
                    break;
                case "H":
                    p = 10 > u ? "0" + u : u;
                    break;
                case "I":
                    p = 10 > d ? "0" + d : d;
                    break;
                case "j":
                    p = 100 > n ? 10 > n ? "00" + n : "0" + n : n;
                    break;
                case "k":
                    p = u;
                    break;
                case "l":
                    p = d;
                    break;
                case "m":
                    p = 9 > i ? "0" + (1 + i) : 1 + i;
                    break;
                case "M":
                    p = 10 > c ? "0" + c : c;
                    break;
                case "p":
                case "P":
                    p = l ? "PM" : "AM";
                    break;
                case "s":
                    p = Math.floor(e.getTime() / 1e3);
                    break;
                case "S":
                    p = 10 > m ? "0" + m : m;
                    break;
                case "u":
                    p = s + 1;
                    break;
                case "w":
                    p = s;
                    break;
                case "y":
                    p = ("" + r).substr(2, 2);
                    break;
                case "Y":
                    p = r
            }
            t[f] = p
        }
        return t.join("")
    }

    function w(e, t) {
        var a, i = e.__pickmeup.options;
        v(t);
        e: {
            var o;
            switch (i.mode) {
                case "multiple":
                    for (o = t.valueOf(), a = 0; a < i.date.length; ++a)
                        if (i.date[a].valueOf() === o) {
                            i.date.splice(a, 1);
                            break e
                        } i.date.push(t);
                    break;
                case "range":
                    i.lastSel || (i.date[0] = t), t <= i.date[0] ? (i.date[1] = i.date[0], i.date[0] = t) : i.date[1] = t, i.lastSel = !i.lastSel;
                    break;
                default:
                    i.date = t.valueOf()
            }
        }
        t = y(i), n(e, "input") && (e.value = "single" == i.mode ? t.formatted_date : t.formatted_date.join(i.separator)), l(e, "change", t), i.flat || !i.hide_on_select || "range" == i.mode && i.lastSel || i.bound.hide()
    }

    function g(e, t) {
        var r = t.target;
        if (i(r, "pmu-button") || (r = a(r, ".pmu-button")), !i(r, "pmu-button") || i(r, "pmu-disabled")) return !1;
        t.preventDefault(), t.stopPropagation(), e = e.__pickmeup.options;
        var s = a(r, ".pmu-instance");
        return t = s.parentElement, s = Array.prototype.slice.call(t.querySelectorAll(".pmu-instance")).indexOf(s), n(r.parentElement, "nav") ? i(r, "pmu-month") ? (m(e.current, s - Math.floor(e.calendars / 2)), i(t, "pmu-view-years") ? (e.current = "single" != e.mode ? new Date(e.date[e.date.length - 1]) : new Date(e.date), e.select_day ? (t.classList.remove("pmu-view-years"), o(t, "pmu-view-days")) : e.select_month && (t.classList.remove("pmu-view-years"), o(t, "pmu-view-months"))) : i(t, "pmu-view-months") ? e.select_year ? (t.classList.remove("pmu-view-months"), o(t, "pmu-view-years")) : e.select_day && (t.classList.remove("pmu-view-months"), o(t, "pmu-view-days")) : i(t, "pmu-view-days") && (e.select_month ? (t.classList.remove("pmu-view-days"), o(t, "pmu-view-months")) : e.select_year && (t.classList.remove("pmu-view-days"), o(t, "pmu-view-years")))) : i(r, "pmu-prev") ? e.bound.prev(!1) : e.bound.next(!1) : i(t, "pmu-view-years") ? (e.current.setFullYear(r.__pickmeup_year), e.select_month ? (t.classList.remove("pmu-view-years"), o(t, "pmu-view-months")) : e.select_day ? (t.classList.remove("pmu-view-years"), o(t, "pmu-view-days")) : e.bound.update_date(e.current)) : i(t, "pmu-view-months") ? (e.current.setMonth(r.__pickmeup_month), e.current.setFullYear(r.__pickmeup_year), e.select_day ? (t.classList.remove("pmu-view-months"), o(t, "pmu-view-days")) : e.bound.update_date(e.current), m(e.current, Math.floor(e.calendars / 2) - s)) : ((t = new Date(e.current)).setYear(r.__pickmeup_year), t.setMonth(r.__pickmeup_month), t.setDate(r.__pickmeup_day), e.bound.update_date(t)), e.bound.fill(), !0
    }

    function y(e) {
        var t;
        return "single" == e.mode ? (t = new Date(e.date), {
            formatted_date: _(t, e.format, e.locales[e.locale]),
            date: t
        }) : (t = {
            formatted_date: [],
            date: []
        }, e.date.forEach(function(a) {
            a = new Date(a), t.formatted_date.push(_(a, e.format, e.locales[e.locale])), t.date.push(a)
        }), t)
    }

    function b(e, t) {
        var a = e.__pickmeup.element;
        if (t || i(a, "pmu-hidden")) {
            var o = e.__pickmeup.options,
                s = u(e),
                d = window.pageXOffset,
                c = window.pageYOffset,
                m = document.documentElement.clientWidth,
                p = document.documentElement.clientHeight,
                f = s.top,
                h = s.left;
            if (o.bound.fill(), n(e, "input") && ((t = e.value) && o.bound.set_date(t), r(e, e, "keydown", function(e) {
                    9 == e.which && o.bound.hide()
                }), o.lastSel = !1), l(e, "show") && !o.flat) {
                switch (o.position) {
                    case "top":
                        f -= a.offsetHeight;
                        break;
                    case "left":
                        h -= a.offsetWidth;
                        break;
                    case "right":
                        h += e.offsetWidth;
                        break;
                    case "bottom":
                        f += e.offsetHeight
                }
                f + a.offsetHeight > c + p && (f = s.top - a.offsetHeight), f < c && (f = s.top + e.offsetHeight), h + a.offsetWidth > d + m && (h = s.left - a.offsetWidth), h < d && (h = s.left + e.offsetWidth), a.style.top = f + "px", a.style.left = h + "px", a.classList.remove("pmu-hidden"), setTimeout(function() {
                    r(e, document.documentElement, "click", o.bound.hide), r(e, window, "resize", o.bound.forced_show)
                })
            }
        }
    }

    function k(e, t) {
        var a = e.__pickmeup.element,
            n = e.__pickmeup.options;
        t && t.target && (t.target == e || 16 & a.compareDocumentPosition(t.target)) || !l(e, "hide") || (o(a, "pmu-hidden"), s(e, document.documentElement, "click", n.bound.hide), s(e, window, "resize", n.bound.forced_show), n.lastSel = !1)
    }

    function D(e) {
        var t = e.__pickmeup.options;
        s(e, document.documentElement, "click", t.bound.hide), s(e, window, "resize", t.bound.forced_show), t.bound.forced_show()
    }

    function M(e) {
        "single" != (e = e.__pickmeup.options).mode && (e.date = [], e.lastSel = !1, e.bound.fill())
    }

    function x(e, t) {
        void 0 === t && (t = !0);
        var a = e.__pickmeup.element;
        e = e.__pickmeup.options, i(a, "pmu-view-years") ? p(e.current, -12) : i(a, "pmu-view-months") ? p(e.current, -1) : i(a, "pmu-view-days") && m(e.current, -1), t && e.bound.fill()
    }

    function S(e, t) {
        void 0 === t && (t = !0);
        var a = e.__pickmeup.element;
        e = e.__pickmeup.options, i(a, "pmu-view-years") ? p(e.current, 12) : i(a, "pmu-view-months") ? p(e.current, 1) : i(a, "pmu-view-days") && m(e.current, 1), t && e.bound.fill()
    }

    function Y(e, t) {
        var a = e.__pickmeup.options;
        return e = y(a), "string" == typeof t ? (e = e.date) instanceof Date ? _(e, t, a.locales[a.locale]) : e.map(function(e) {
            return _(e, t, a.locales[a.locale])
        }) : e[t ? "formatted_date" : "date"]
    }

    function F(e, t, a) {
        var i = e.__pickmeup.options;
        if (!(t instanceof Array) || 0 < t.length)
            if (i.date = h(t, i), "single" != i.mode)
                for (i.date instanceof Array ? (i.date[0] = i.date[0] || h(new Date, i), "range" == i.mode && (i.date[1] = i.date[1] || h(i.date[0], i))) : (i.date = [i.date], "range" == i.mode && i.date.push(h(i.date[0], i))), t = 0; t < i.date.length; ++t) i.date[t] = O(i.date[t], i.min, i.max);
            else i.date instanceof Array && (i.date = i.date[0]), i.date = O(i.date, i.min, i.max);
        else i.date = [];
        if (!i.select_day)
            if (i.date instanceof Array)
                for (t = 0; t < i.date.length; ++t) i.date[t].setDate(1);
            else i.date.setDate(1);
        if ("multiple" == i.mode)
            for (t = 0; t < i.date.length; ++t) i.date.indexOf(i.date[t]) !== t && (i.date.splice(t, 1), --t);
        a ? i.current = h(a, i) : (a = "single" === i.mode ? i.date : i.date[i.date.length - 1], i.current = a ? new Date(a) : new Date), i.current.setDate(1), i.bound.fill(), n(e, "input") && !1 !== i.default_date && (a = y(i), t = e.value, i = "single" == i.mode ? a.formatted_date : a.formatted_date.join(i.separator), t || l(e, "change", a), t != i && (e.value = i))
    }

    function E(e) {
        var a = e.__pickmeup.element;
        s(e), t(a), delete e.__pickmeup
    }

    function O(e, t, a) {
        return t && t > e ? new Date(t) : a && a < e ? new Date(a) : e
    }

    function A(e, t) {
        if ("string" == typeof e && (e = document.querySelector(e)), !e) return null;
        if (!e.__pickmeup) {
            var a, n = {};
            t = t || {};
            for (a in A.defaults) n[a] = a in t ? t[a] : A.defaults[a];
            for (a in n) null !== (t = e.getAttribute("data-pmu-" + a)) && (n[a] = t);
            "days" != n.view || n.select_day || (n.view = "months"), "months" != n.view || n.select_month || (n.view = "years"), "years" != n.view || n.select_year || (n.view = "days"), "days" != n.view || n.select_day || (n.view = "months"), n.calendars = Math.max(1, parseInt(n.calendars, 10) || 1), n.mode = /single|multiple|range/.test(n.mode) ? n.mode : "single", n.min && (n.min = h(n.min, n), n.select_day || n.min.setDate(1)), n.max && (n.max = h(n.max, n), n.select_day || n.max.setDate(1)), t = document.createElement("div"), e.__pickmeup = {
                options: n,
                events: [],
                element: t
            }, t.__pickmeup_target = e, o(t, "pickmeup"), n.class_name && o(t, n.class_name), n.bound = {
                fill: f.bind(e, e),
                update_date: w.bind(e, e),
                click: g.bind(e, e),
                show: b.bind(e, e),
                forced_show: b.bind(e, e, !0),
                hide: k.bind(e, e),
                update: D.bind(e, e),
                clear: M.bind(e, e),
                prev: x.bind(e, e),
                next: S.bind(e, e),
                get_date: Y.bind(e, e),
                set_date: F.bind(e, e),
                destroy: E.bind(e, e)
            }, o(t, "pmu-view-" + n.view);
            var i = n.instance_template(n),
                s = "";
            for (a = 0; a < n.calendars; ++a) s += i;
            t.innerHTML = s, r(e, t, "click", n.bound.click), r(e, t, "onselectstart" in Element.prototype ? "selectstart" : "mousedown", function(e) {
                e.preventDefault()
            }), n.flat ? (o(t, "pmu-flat"), e.appendChild(t)) : (o(t, "pmu-hidden"), document.body.appendChild(t), r(e, e, "click", b.bind(e, e, !1)), r(e, e, "input", n.bound.update), r(e, e, "change", n.bound.update)), n.bound.set_date(n.date, n.current)
        }
        return n = e.__pickmeup.options, {
            hide: n.bound.hide,
            show: n.bound.show,
            clear: n.bound.clear,
            update: n.bound.update,
            prev: n.bound.prev,
            next: n.bound.next,
            get_date: n.bound.get_date,
            set_date: n.bound.set_date,
            destroy: n.bound.destroy
        }
    }
    return A.defaults = {
        current: null,
        date: new Date,
        default_date: new Date,
        flat: !1,
        first_day: 1,
        prev: "&#9664;",
        next: "&#9654;",
        mode: "single",
        select_year: !0,
        select_month: !0,
        select_day: !0,
        view: "days",
        calendars: 1,
        format: "d-m-Y",
        title_format: "B, Y",
        position: "bottom",
        class_name: "",
        separator: " - ",
        hide_on_select: !1,
        min: null,
        max: null,
        render: function() {},
        locale: "en",
        locales: {
            en: {
                days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                daysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                daysMin: "Su Mo Tu We Th Fr Sa".split(" "),
                months: "January February March April May June July August September October November December".split(" "),
                monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
            }
        },
        instance_template: function(e) {
            var t = e.locales[e.locale].daysMin.slice();
            return e.first_day && t.push(t.shift()), '<div class="pmu-instance"><nav><div class="pmu-prev pmu-button">' + e.prev + '</div><div class="pmu-month pmu-button"></div><div class="pmu-next pmu-button">' + e.next + '</div></nav><nav class="pmu-day-of-week"><div>' + t.join("</div><div>") + "</div></nav></div>"
        },
        instance_content_template: function(e, t) {
            var a = document.createElement("div");
            for (o(a, t), t = 0; t < e.length; ++t) o(e[t], "pmu-button"), a.appendChild(e[t]);
            return a
        }
    }, A
});
! function(t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.noUiSlider = t()
}(function() {
    "use strict";

    function t(t) {
        return "object" == typeof t && "function" == typeof t.to && "function" == typeof t.from
    }

    function e(t) {
        t.parentElement.removeChild(t)
    }

    function r(t) {
        t.preventDefault()
    }

    function n(t) {
        return t.filter(function(t) {
            return !this[t] && (this[t] = !0)
        }, {})
    }

    function i(t, e) {
        return Math.round(t / e) * e
    }

    function o(t, e) {
        var r = t.getBoundingClientRect(),
            n = t.ownerDocument,
            i = n.documentElement,
            o = h(n);
        return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (o.x = 0), e ? r.top + o.y - i.clientTop : r.left + o.x - i.clientLeft
    }

    function s(t) {
        return "number" == typeof t && !isNaN(t) && isFinite(t)
    }

    function a(t, e, r) {
        r > 0 && (p(t, e), setTimeout(function() {
            f(t, e)
        }, r))
    }

    function l(t) {
        return Math.max(Math.min(t, 100), 0)
    }

    function u(t) {
        return Array.isArray(t) ? t : [t]
    }

    function c(t) {
        var e = (t = String(t)).split(".");
        return e.length > 1 ? e[1].length : 0
    }

    function p(t, e) {
        t.classList ? t.classList.add(e) : t.className += " " + e
    }

    function f(t, e) {
        t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")
    }

    function d(t, e) {
        return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className)
    }

    function h(t) {
        var e = void 0 !== window.pageXOffset,
            r = "CSS1Compat" === (t.compatMode || "");
        return {
            x: e ? window.pageXOffset : r ? t.documentElement.scrollLeft : t.body.scrollLeft,
            y: e ? window.pageYOffset : r ? t.documentElement.scrollTop : t.body.scrollTop
        }
    }

    function m() {
        return window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        }
    }

    function g() {
        var t = !1;
        try {
            var e = Object.defineProperty({}, "passive", {
                get: function() {
                    t = !0
                }
            });
            window.addEventListener("test", null, e)
        } catch (t) {}
        return t
    }

    function v() {
        return window.CSS && CSS.supports && CSS.supports("touch-action", "none")
    }

    function b(t, e) {
        return 100 / (e - t)
    }

    function S(t, e) {
        return 100 * e / (t[1] - t[0])
    }

    function w(t, e) {
        return S(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0])
    }

    function x(t, e) {
        return e * (t[1] - t[0]) / 100 + t[0]
    }

    function y(t, e) {
        for (var r = 1; t >= e[r];) r += 1;
        return r
    }

    function E(t, e, r) {
        if (r >= t.slice(-1)[0]) return 100;
        var n, i, o, s, a = y(r, t);
        return n = t[a - 1], i = t[a], o = e[a - 1], s = e[a], o + w([n, i], r) / b(o, s)
    }

    function C(t, e, r) {
        if (r >= 100) return t.slice(-1)[0];
        var n, i, o, s, a = y(r, e);
        return n = t[a - 1], i = t[a], o = e[a - 1], s = e[a], x([n, i], (r - o) * b(o, s))
    }

    function N(t, e, r, n) {
        if (100 === n) return n;
        var o, s, a = y(n, t);
        return r ? (o = t[a - 1], s = t[a], n - o > (s - o) / 2 ? s : o) : e[a - 1] ? t[a - 1] + i(n - t[a - 1], e[a - 1]) : n
    }

    function U(t, e, r) {
        var n;
        if ("number" == typeof e && (e = [e]), "[object Array]" !== Object.prototype.toString.call(e)) throw new Error("noUiSlider (" + K + "): 'range' contains invalid value.");
        if (n = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t), !s(n) || !s(e[0])) throw new Error("noUiSlider (" + K + "): 'range' value isn't numeric.");
        r.xPct.push(n), r.xVal.push(e[0]), n ? r.xSteps.push(!isNaN(e[1]) && e[1]) : isNaN(e[1]) || (r.xSteps[0] = e[1]), r.xHighestCompleteStep.push(0)
    }

    function P(t, e, r) {
        if (!e) return !0;
        r.xSteps[t] = S([r.xVal[t], r.xVal[t + 1]], e) / b(r.xPct[t], r.xPct[t + 1]);
        var n = (r.xVal[t + 1] - r.xVal[t]) / r.xNumSteps[t],
            i = Math.ceil(Number(n.toFixed(3)) - 1),
            o = r.xVal[t] + r.xNumSteps[t] * i;
        r.xHighestCompleteStep[t] = o
    }

    function A(t, e, r) {
        this.xPct = [], this.xVal = [], this.xSteps = [r || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = e;
        var n, i = [];
        for (n in t) t.hasOwnProperty(n) && i.push([t[n], n]);
        for (i.sort(i.length && "object" == typeof i[0][0] ? function(t, e) {
                return t[0][0] - e[0][0]
            } : function(t, e) {
                return t[0] - e[0]
            }), n = 0; n < i.length; n++) U(i[n][1], i[n][0], this);
        for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) P(n, this.xNumSteps[n], this)
    }

    function M(e) {
        if (t(e)) return !0;
        throw new Error("noUiSlider (" + K + "): 'format' requires 'to' and 'from' methods.")
    }

    function O(t, e) {
        if (!s(e)) throw new Error("noUiSlider (" + K + "): 'step' is not numeric.");
        t.singleStep = e
    }

    function k(t, e) {
        if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider (" + K + "): 'range' is not an object.");
        if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider (" + K + "): Missing 'min' or 'max' in 'range'.");
        if (e.min === e.max) throw new Error("noUiSlider (" + K + "): 'range' 'min' and 'max' cannot be equal.");
        t.spectrum = new A(e, t.snap, t.singleStep)
    }

    function V(t, e) {
        if (e = u(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider (" + K + "): 'start' option is incorrect.");
        t.handles = e.length, t.start = e
    }

    function F(t, e) {
        if (t.snap = e, "boolean" != typeof e) throw new Error("noUiSlider (" + K + "): 'snap' option must be a boolean.")
    }

    function L(t, e) {
        if (t.animate = e, "boolean" != typeof e) throw new Error("noUiSlider (" + K + "): 'animate' option must be a boolean.")
    }

    function z(t, e) {
        if (t.animationDuration = e, "number" != typeof e) throw new Error("noUiSlider (" + K + "): 'animationDuration' option must be a number.")
    }

    function j(t, e) {
        var r, n = [!1];
        if ("lower" === e ? e = [!0, !1] : "upper" === e && (e = [!1, !0]), !0 === e || !1 === e) {
            for (r = 1; r < t.handles; r++) n.push(e);
            n.push(!1)
        } else {
            if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider (" + K + "): 'connect' option doesn't match handle count.");
            n = e
        }
        t.connect = n
    }

    function H(t, e) {
        switch (e) {
            case "horizontal":
                t.ort = 0;
                break;
            case "vertical":
                t.ort = 1;
                break;
            default:
                throw new Error("noUiSlider (" + K + "): 'orientation' option is invalid.")
        }
    }

    function D(t, e) {
        if (!s(e)) throw new Error("noUiSlider (" + K + "): 'margin' option must be numeric.");
        if (0 !== e && (t.margin = t.spectrum.getMargin(e), !t.margin)) throw new Error("noUiSlider (" + K + "): 'margin' option is only supported on linear sliders.")
    }

    function q(t, e) {
        if (!s(e)) throw new Error("noUiSlider (" + K + "): 'limit' option must be numeric.");
        if (t.limit = t.spectrum.getMargin(e), !t.limit || t.handles < 2) throw new Error("noUiSlider (" + K + "): 'limit' option is only supported on linear sliders with 2 or more handles.")
    }

    function T(t, e) {
        if (!s(e)) throw new Error("noUiSlider (" + K + "): 'padding' option must be numeric.");
        if (0 !== e) {
            if (t.padding = t.spectrum.getMargin(e), !t.padding) throw new Error("noUiSlider (" + K + "): 'padding' option is only supported on linear sliders.");
            if (t.padding < 0) throw new Error("noUiSlider (" + K + "): 'padding' option must be a positive number.");
            if (t.padding >= 50) throw new Error("noUiSlider (" + K + "): 'padding' option must be less than half the range.")
        }
    }

    function R(t, e) {
        switch (e) {
            case "ltr":
                t.dir = 0;
                break;
            case "rtl":
                t.dir = 1;
                break;
            default:
                throw new Error("noUiSlider (" + K + "): 'direction' option was not recognized.")
        }
    }

    function B(t, e) {
        if ("string" != typeof e) throw new Error("noUiSlider (" + K + "): 'behaviour' must be a string containing options.");
        var r = e.indexOf("tap") >= 0,
            n = e.indexOf("drag") >= 0,
            i = e.indexOf("fixed") >= 0,
            o = e.indexOf("snap") >= 0,
            s = e.indexOf("hover") >= 0;
        if (i) {
            if (2 !== t.handles) throw new Error("noUiSlider (" + K + "): 'fixed' behaviour must be used with 2 handles");
            D(t, t.start[1] - t.start[0])
        }
        t.events = {
            tap: r || o,
            drag: n,
            fixed: i,
            snap: o,
            hover: s
        }
    }

    function X(t, e) {
        if (!1 !== e)
            if (!0 === e) {
                t.tooltips = [];
                for (var r = 0; r < t.handles; r++) t.tooltips.push(!0)
            } else {
                if (t.tooltips = u(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider (" + K + "): must pass a formatter for all handles.");
                t.tooltips.forEach(function(t) {
                    if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider (" + K + "): 'tooltips' must be passed a formatter or 'false'.")
                })
            }
    }

    function Y(t, e) {
        t.ariaFormat = e, M(e)
    }

    function I(t, e) {
        t.format = e, M(e)
    }

    function _(t, e) {
        if (void 0 !== e && "string" != typeof e && !1 !== e) throw new Error("noUiSlider (" + K + "): 'cssPrefix' must be a string or `false`.");
        t.cssPrefix = e
    }

    function W(t, e) {
        if (void 0 !== e && "object" != typeof e) throw new Error("noUiSlider (" + K + "): 'cssClasses' must be an object.");
        if ("string" == typeof t.cssPrefix) {
            t.cssClasses = {};
            for (var r in e) e.hasOwnProperty(r) && (t.cssClasses[r] = t.cssPrefix + e[r])
        } else t.cssClasses = e
    }

    function $(t, e) {
        if (!0 !== e && !1 !== e) throw new Error("noUiSlider (" + K + "): 'useRequestAnimationFrame' option should be true (default) or false.");
        t.useRequestAnimationFrame = e
    }

    function G(t) {
        var e = {
                margin: 0,
                limit: 0,
                padding: 0,
                animate: !0,
                animationDuration: 300,
                ariaFormat: Q,
                format: Q
            },
            r = {
                step: {
                    r: !1,
                    t: O
                },
                start: {
                    r: !0,
                    t: V
                },
                connect: {
                    r: !0,
                    t: j
                },
                direction: {
                    r: !0,
                    t: R
                },
                snap: {
                    r: !1,
                    t: F
                },
                animate: {
                    r: !1,
                    t: L
                },
                animationDuration: {
                    r: !1,
                    t: z
                },
                range: {
                    r: !0,
                    t: k
                },
                orientation: {
                    r: !1,
                    t: H
                },
                margin: {
                    r: !1,
                    t: D
                },
                limit: {
                    r: !1,
                    t: q
                },
                padding: {
                    r: !1,
                    t: T
                },
                behaviour: {
                    r: !0,
                    t: B
                },
                ariaFormat: {
                    r: !1,
                    t: Y
                },
                format: {
                    r: !1,
                    t: I
                },
                tooltips: {
                    r: !1,
                    t: X
                },
                cssPrefix: {
                    r: !1,
                    t: _
                },
                cssClasses: {
                    r: !1,
                    t: W
                },
                useRequestAnimationFrame: {
                    r: !1,
                    t: $
                }
            },
            n = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                cssPrefix: "noUi-",
                cssClasses: {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    handleLower: "handle-lower",
                    handleUpper: "handle-upper",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    ltr: "ltr",
                    rtl: "rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                },
                useRequestAnimationFrame: !0
            };
        t.format && !t.ariaFormat && (t.ariaFormat = t.format), Object.keys(r).forEach(function(i) {
            if (void 0 === t[i] && void 0 === n[i]) {
                if (r[i].r) throw new Error("noUiSlider (" + K + "): '" + i + "' is required.");
                return !0
            }
            r[i].t(e, void 0 === t[i] ? n[i] : t[i])
        }), e.pips = t.pips;
        var i = [
            ["left", "top"],
            ["right", "bottom"]
        ];
        return e.style = i[e.dir][e.ort], e.styleOposite = i[e.dir ? 0 : 1][e.ort], e
    }

    function J(t, i, s) {
        function c(t, e) {
            var r = ft.createElement("div");
            return e && p(r, e), t.appendChild(r), r
        }

        function b(t, e) {
            var r = c(t, i.cssClasses.origin),
                n = c(r, i.cssClasses.handle);
            return n.setAttribute("data-handle", e), n.setAttribute("tabindex", "0"), n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", i.ort ? "vertical" : "horizontal"), 0 === e ? p(n, i.cssClasses.handleLower) : e === i.handles - 1 && p(n, i.cssClasses.handleUpper), r
        }

        function S(t, e) {
            return !!e && c(t, i.cssClasses.connect)
        }

        function w(t, e) {
            return !!i.tooltips[e] && c(t.firstChild, i.cssClasses.tooltip)
        }

        function x(t, e, r) {
            if ("range" === t || "steps" === t) return lt.xVal;
            if ("count" === t) {
                if (!e) throw new Error("noUiSlider (" + K + "): 'values' required for mode 'count'.");
                var n, i = 100 / (e - 1),
                    o = 0;
                for (e = [];
                    (n = o++ * i) <= 100;) e.push(n);
                t = "positions"
            }
            return "positions" === t ? e.map(function(t) {
                return lt.fromStepping(r ? lt.getStep(t) : t)
            }) : "values" === t ? r ? e.map(function(t) {
                return lt.fromStepping(lt.getStep(lt.toStepping(t)))
            }) : e : void 0
        }

        function y(t, e, r) {
            function i(t, e) {
                return (t + e).toFixed(7) / 1
            }
            var o = {},
                s = lt.xVal[0],
                a = lt.xVal[lt.xVal.length - 1],
                l = !1,
                u = !1,
                c = 0;
            return (r = n(r.slice().sort(function(t, e) {
                return t - e
            })))[0] !== s && (r.unshift(s), l = !0), r[r.length - 1] !== a && (r.push(a), u = !0), r.forEach(function(n, s) {
                var a, p, f, d, h, m, g, v, b, S, w = n,
                    x = r[s + 1];
                if ("steps" === e && (a = lt.xNumSteps[s]), a || (a = x - w), !1 !== w && void 0 !== x)
                    for (a = Math.max(a, 1e-7), p = w; x >= p; p = i(p, a)) {
                        for (v = (h = (d = lt.toStepping(p)) - c) / t, S = h / (b = Math.round(v)), f = 1; b >= f; f += 1) m = c + f * S, o[m.toFixed(5)] = ["x", 0];
                        g = r.indexOf(p) > -1 ? 1 : "steps" === e ? 2 : 0, !s && l && (g = 0), p === x && u || (o[d.toFixed(5)] = [p, g]), c = d
                    }
            }), o
        }

        function E(t, e, r) {
            function n(t, e) {
                var r = e === i.cssClasses.value,
                    n = r ? u : f,
                    o = r ? a : l;
                return e + " " + n[i.ort] + " " + o[t]
            }

            function o(t, o) {
                o[1] = o[1] && e ? e(o[0], o[1]) : o[1];
                var a = c(s, !1);
                a.className = n(o[1], i.cssClasses.marker), a.style[i.style] = t + "%", o[1] && (a = c(s, !1), a.className = n(o[1], i.cssClasses.value), a.style[i.style] = t + "%", a.innerText = r.to(o[0]))
            }
            var s = ft.createElement("div"),
                a = [i.cssClasses.valueNormal, i.cssClasses.valueLarge, i.cssClasses.valueSub],
                l = [i.cssClasses.markerNormal, i.cssClasses.markerLarge, i.cssClasses.markerSub],
                u = [i.cssClasses.valueHorizontal, i.cssClasses.valueVertical],
                f = [i.cssClasses.markerHorizontal, i.cssClasses.markerVertical];
            return p(s, i.cssClasses.pips), p(s, 0 === i.ort ? i.cssClasses.pipsHorizontal : i.cssClasses.pipsVertical), Object.keys(t).forEach(function(e) {
                o(e, t[e])
            }), s
        }

        function C() {
            et && (e(et), et = null)
        }

        function N(t) {
            C();
            var e = t.mode,
                r = t.density || 1,
                n = t.filter || !1,
                i = y(r, e, x(e, t.values || !1, t.stepped || !1)),
                o = t.format || {
                    to: Math.round
                };
            return et = it.appendChild(E(i, n, o))
        }

        function U() {
            var t = J.getBoundingClientRect(),
                e = "offset" + ["Width", "Height"][i.ort];
            return 0 === i.ort ? t.width || J[e] : t.height || J[e]
        }

        function P(t, e, r, n) {
            var o = function(e) {
                    return !it.hasAttribute("disabled") && (!d(it, i.cssClasses.tap) && (!!(e = A(e, n.pageOffset)) && (!(t === rt.start && void 0 !== e.buttons && e.buttons > 1) && ((!n.hover || !e.buttons) && (nt || e.preventDefault(), e.calcPoint = e.points[i.ort], void r(e, n))))))
                },
                s = [];
            return t.split(" ").forEach(function(t) {
                e.addEventListener(t, o, !!nt && {
                    passive: !0
                }), s.push([t, o])
            }), s
        }

        function A(t, e) {
            var r, n, i = 0 === t.type.indexOf("touch"),
                o = 0 === t.type.indexOf("mouse"),
                s = 0 === t.type.indexOf("pointer");
            if (0 === t.type.indexOf("MSPointer") && (s = !0), i) {
                if (t.touches.length > 1) return !1;
                r = t.changedTouches[0].pageX, n = t.changedTouches[0].pageY
            }
            return e = e || h(ft), (o || s) && (r = t.clientX + e.x, n = t.clientY + e.y), t.pageOffset = e, t.points = [r, n], t.cursor = o || s, t
        }

        function M(t) {
            var e = 100 * (t - o(J, i.ort)) / U();
            return i.dir ? 100 - e : e
        }

        function O(t) {
            var e = 100,
                r = !1;
            return Q.forEach(function(n, i) {
                if (!n.hasAttribute("disabled")) {
                    var o = Math.abs(ot[i] - t);
                    e > o && (r = i, e = o)
                }
            }), r
        }

        function k(t, e, r, n) {
            var i = r.slice(),
                o = [!t, t],
                s = [t, !t];
            n = n.slice(), t && n.reverse(), n.length > 1 ? n.forEach(function(t, r) {
                var n = q(i, t, i[t] + e, o[r], s[r], !1);
                !1 === n ? e = 0 : (e = n - i[t], i[t] = n)
            }) : o = s = [!0];
            var a = !1;
            n.forEach(function(t, n) {
                a = X(t, r[t] + e, o[n], s[n]) || a
            }), a && n.forEach(function(t) {
                V("update", t), V("slide", t)
            })
        }

        function V(t, e, r) {
            Object.keys(ct).forEach(function(n) {
                var o = n.split(".")[0];
                t === o && ct[n].forEach(function(t) {
                    t.call(tt, ut.map(i.format.to), e, ut.slice(), r || !1, ot.slice())
                })
            })
        }

        function F(t, e) {
            "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && z(t, e)
        }

        function L(t, e) {
            if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return z(t, e);
            var r = (i.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
            k(r > 0, 100 * r / e.baseSize, e.locations, e.handleNumbers)
        }

        function z(t, e) {
            at && (f(at, i.cssClasses.active), at = !1), t.cursor && (ht.style.cursor = "", ht.removeEventListener("selectstart", r)), pt.forEach(function(t) {
                dt.removeEventListener(t[0], t[1])
            }), f(it, i.cssClasses.drag), B(), e.handleNumbers.forEach(function(t) {
                V("change", t), V("set", t), V("end", t)
            })
        }

        function j(t, e) {
            if (1 === e.handleNumbers.length) {
                var n = Q[e.handleNumbers[0]];
                if (n.hasAttribute("disabled")) return !1;
                p(at = n.children[0], i.cssClasses.active)
            }
            t.stopPropagation();
            var o = P(rt.move, dt, L, {
                    startCalcPoint: t.calcPoint,
                    baseSize: U(),
                    pageOffset: t.pageOffset,
                    handleNumbers: e.handleNumbers,
                    buttonsProperty: t.buttons,
                    locations: ot.slice()
                }),
                s = P(rt.end, dt, z, {
                    handleNumbers: e.handleNumbers
                }),
                a = P("mouseout", dt, F, {
                    handleNumbers: e.handleNumbers
                });
            pt = o.concat(s, a), t.cursor && (ht.style.cursor = getComputedStyle(t.target).cursor, Q.length > 1 && p(it, i.cssClasses.drag), ht.addEventListener("selectstart", r, !1)), e.handleNumbers.forEach(function(t) {
                V("start", t)
            })
        }

        function H(t) {
            t.stopPropagation();
            var e = M(t.calcPoint),
                r = O(e);
            return !1 !== r && (i.events.snap || a(it, i.cssClasses.tap, i.animationDuration), X(r, e, !0, !0), B(), V("slide", r, !0), V("update", r, !0), V("change", r, !0), V("set", r, !0), void(i.events.snap && j(t, {
                handleNumbers: [r]
            })))
        }

        function D(t) {
            var e = M(t.calcPoint),
                r = lt.getStep(e),
                n = lt.fromStepping(r);
            Object.keys(ct).forEach(function(t) {
                "hover" === t.split(".")[0] && ct[t].forEach(function(t) {
                    t.call(tt, n)
                })
            })
        }

        function q(t, e, r, n, o, s) {
            return Q.length > 1 && (n && e > 0 && (r = Math.max(r, t[e - 1] + i.margin)), o && e < Q.length - 1 && (r = Math.min(r, t[e + 1] - i.margin))), Q.length > 1 && i.limit && (n && e > 0 && (r = Math.min(r, t[e - 1] + i.limit)), o && e < Q.length - 1 && (r = Math.max(r, t[e + 1] - i.limit))), i.padding && (0 === e && (r = Math.max(r, i.padding)), e === Q.length - 1 && (r = Math.min(r, 100 - i.padding))), r = lt.getStep(r), !((r = l(r)) === t[e] && !s) && r
        }

        function T(t) {
            return t + "%"
        }

        function R(t, e) {
            ot[t] = e, ut[t] = lt.fromStepping(e);
            var r = function() {
                Q[t].style[i.style] = T(e), Y(t), Y(t + 1)
            };
            window.requestAnimationFrame && i.useRequestAnimationFrame ? window.requestAnimationFrame(r) : r()
        }

        function B() {
            st.forEach(function(t) {
                var e = ot[t] > 50 ? -1 : 1,
                    r = 3 + (Q.length + e * t);
                Q[t].childNodes[0].style.zIndex = r
            })
        }

        function X(t, e, r, n) {
            return !1 !== (e = q(ot, t, e, r, n, !1)) && (R(t, e), !0)
        }

        function Y(t) {
            if (Z[t]) {
                var e = 0,
                    r = 100;
                0 !== t && (e = ot[t - 1]), t !== Z.length - 1 && (r = ot[t]), Z[t].style[i.style] = T(e), Z[t].style[i.styleOposite] = T(100 - r)
            }
        }

        function I(t, e) {
            null !== t && !1 !== t && ("number" == typeof t && (t = String(t)), !1 === (t = i.format.from(t)) || isNaN(t) || X(e, lt.toStepping(t), !1, !1))
        }

        function _(t, e) {
            var r = u(t),
                n = void 0 === ot[0];
            e = void 0 === e || !!e, r.forEach(I), i.animate && !n && a(it, i.cssClasses.tap, i.animationDuration), st.forEach(function(t) {
                X(t, ot[t], !0, !1)
            }), B(), st.forEach(function(t) {
                V("update", t), null !== r[t] && e && V("set", t)
            })
        }

        function W() {
            var t = ut.map(i.format.to);
            return 1 === t.length ? t[0] : t
        }

        function $(t, e) {
            ct[t] = ct[t] || [], ct[t].push(e), "update" === t.split(".")[0] && Q.forEach(function(t, e) {
                V("update", e)
            })
        }
        var J, Q, Z, tt, et, rt = m(),
            nt = v() && g(),
            it = t,
            ot = [],
            st = [],
            at = !1,
            lt = i.spectrum,
            ut = [],
            ct = {},
            pt = null,
            ft = t.ownerDocument,
            dt = ft.documentElement,
            ht = ft.body;
        if (it.noUiSlider) throw new Error("noUiSlider (" + K + "): Slider was already initialized.");
        return function(t) {
                p(t, i.cssClasses.target), 0 === i.dir ? p(t, i.cssClasses.ltr) : p(t, i.cssClasses.rtl), 0 === i.ort ? p(t, i.cssClasses.horizontal) : p(t, i.cssClasses.vertical), J = c(t, i.cssClasses.base)
            }(it),
            function(t, e) {
                Q = [], (Z = []).push(S(e, t[0]));
                for (var r = 0; r < i.handles; r++) Q.push(b(e, r)), st[r] = r, Z.push(S(e, t[r + 1]))
            }(i.connect, J), tt = {
                destroy: function() {
                    for (var t in i.cssClasses) i.cssClasses.hasOwnProperty(t) && f(it, i.cssClasses[t]);
                    for (; it.firstChild;) it.removeChild(it.firstChild);
                    delete it.noUiSlider
                },
                steps: function() {
                    return ot.map(function(t, e) {
                        var r = lt.getNearbySteps(t),
                            n = ut[e],
                            i = r.thisStep.step,
                            o = null;
                        !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n), o = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep, 100 === t ? i = null : 0 === t && (o = null);
                        var s = lt.countStepDecimals();
                        return null !== i && !1 !== i && (i = Number(i.toFixed(s))), null !== o && !1 !== o && (o = Number(o.toFixed(s))), [o, i]
                    })
                },
                on: $,
                off: function(t) {
                    var e = t && t.split(".")[0],
                        r = e && t.substring(e.length);
                    Object.keys(ct).forEach(function(t) {
                        var n = t.split(".")[0],
                            i = t.substring(n.length);
                        e && e !== n || r && r !== i || delete ct[t]
                    })
                },
                get: W,
                set: _,
                reset: function(t) {
                    _(i.start, t)
                },
                __moveHandles: function(t, e, r) {
                    k(t, e, ot, r)
                },
                options: s,
                updateOptions: function(t, e) {
                    var r = W(),
                        n = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format"];
                    n.forEach(function(e) {
                        void 0 !== t[e] && (s[e] = t[e])
                    });
                    var o = G(s);
                    n.forEach(function(e) {
                        void 0 !== t[e] && (i[e] = o[e])
                    }), lt = o.spectrum, i.margin = o.margin, i.limit = o.limit, i.padding = o.padding, i.pips && N(i.pips), ot = [], _(t.start || r, e)
                },
                target: it,
                removePips: C,
                pips: N
            },
            function(t) {
                t.fixed || Q.forEach(function(t, e) {
                    P(rt.start, t.children[0], j, {
                        handleNumbers: [e]
                    })
                }), t.tap && P(rt.start, J, H, {}), t.hover && P(rt.move, J, D, {
                    hover: !0
                }), t.drag && Z.forEach(function(e, r) {
                    if (!1 !== e && 0 !== r && r !== Z.length - 1) {
                        var n = Q[r - 1],
                            o = Q[r],
                            s = [e];
                        p(e, i.cssClasses.draggable), t.fixed && (s.push(n.children[0]), s.push(o.children[0])), s.forEach(function(t) {
                            P(rt.start, t, j, {
                                handles: [n, o],
                                handleNumbers: [r - 1, r]
                            })
                        })
                    }
                })
            }(i.events), _(i.start), i.pips && N(i.pips), i.tooltips && function() {
                var t = Q.map(w);
                $("update", function(e, r, n) {
                    if (t[r]) {
                        var o = e[r];
                        !0 !== i.tooltips[r] && (o = i.tooltips[r].to(n[r])), t[r].innerHTML = o
                    }
                })
            }(), $("update", function(t, e, r, n, o) {
                st.forEach(function(t) {
                    var e = Q[t],
                        n = q(ot, t, 0, !0, !0, !0),
                        s = q(ot, t, 100, !0, !0, !0),
                        a = o[t],
                        l = i.ariaFormat.to(r[t]);
                    e.children[0].setAttribute("aria-valuemin", n.toFixed(1)), e.children[0].setAttribute("aria-valuemax", s.toFixed(1)), e.children[0].setAttribute("aria-valuenow", a.toFixed(1)), e.children[0].setAttribute("aria-valuetext", l)
                })
            }), tt
    }
    var K = "10.0.0";
    A.prototype.getMargin = function(t) {
        var e = this.xNumSteps[0];
        if (e && t / e % 1 != 0) throw new Error("noUiSlider (" + K + "): 'limit', 'margin' and 'padding' must be divisible by step.");
        return 2 === this.xPct.length && S(this.xVal, t)
    }, A.prototype.toStepping = function(t) {
        return t = E(this.xVal, this.xPct, t)
    }, A.prototype.fromStepping = function(t) {
        return C(this.xVal, this.xPct, t)
    }, A.prototype.getStep = function(t) {
        return t = N(this.xPct, this.xSteps, this.snap, t)
    }, A.prototype.getNearbySteps = function(t) {
        var e = y(t, this.xPct);
        return {
            stepBefore: {
                startValue: this.xVal[e - 2],
                step: this.xNumSteps[e - 2],
                highestStep: this.xHighestCompleteStep[e - 2]
            },
            thisStep: {
                startValue: this.xVal[e - 1],
                step: this.xNumSteps[e - 1],
                highestStep: this.xHighestCompleteStep[e - 1]
            },
            stepAfter: {
                startValue: this.xVal[e - 0],
                step: this.xNumSteps[e - 0],
                highestStep: this.xHighestCompleteStep[e - 0]
            }
        }
    }, A.prototype.countStepDecimals = function() {
        var t = this.xNumSteps.map(c);
        return Math.max.apply(null, t)
    }, A.prototype.convert = function(t) {
        return this.getStep(this.toStepping(t))
    };
    var Q = {
        to: function(t) {
            return void 0 !== t && t.toFixed(2)
        },
        from: Number
    };
    return {
        version: K,
        create: function(t, e) {
            if (!t || !t.nodeName) throw new Error("noUiSlider (" + K + "): create requires a single element, got: " + t);
            var r = J(t, G(e, t), e);
            return t.noUiSlider = r, r
        }
    }
});
! function(e) {
    var t = function(t, l) {
        var n = this;
        n.options = t, n.$element = e(l);
        var r = n.$element.val();
        n.$element.removeAttr("multiple"), n.select2 = n.$element.select2({
            allowClear: !0,
            minimumResultsForSearch: t.minimumResultsForSearch,
            placeholder: t.placeholder,
            closeOnSelect: !1,
            templateSelection: function() {
                return n.options.templateSelection(n.$element.val() || [], e("option", n.$element).length)
            },
            templateResult: function(t) {
                return void 0 !== t.loading ? t.text : e("<div>").text(t.text).addClass(n.options.wrapClass)
            },
            matcher: function(t, l) {
                var r = (0, e.fn.select2.defaults.defaults.matcher)(t, l);
                return r && n.options.searchMatchOptGroups && l.children && r.children && l.children.length != r.children.length && (r.children = l.children), r
            }
        }).data("select2"), n.select2.$results.off("mouseup").on("mouseup", ".select2-results__option[aria-selected]", function(t) {
            return function(l) {
                var n = e(this),
                    r = n.data("data");
                "true" !== n.attr("aria-selected") ? t.trigger("select", {
                    originalEvent: l,
                    data: r
                }) : t.trigger("unselect", {
                    originalEvent: l,
                    data: r
                })
            }
        }(n.select2)), n.$element.attr("multiple", "multiple").val(r).trigger("change.select2")
    };
    e.fn.extend({
        select2MultiCheckboxes: function() {
            var l = e.extend({
                placeholder: "Choose elements",
                templateSelection: function(e, t) {
                    return e.length + " > " + t + " total"
                },
                wrapClass: "wrap",
                minimumResultsForSearch: -1,
                searchMatchOptGroups: !0
            }, arguments[0]);
            this.each(function() {
                new t(l, this)
            })
        }
    })
}(jQuery);

function updateDate(e, a) {
    var o = ("0" + a.getDate()).slice(-2),
        r = days[a.getDay()],
        t = months[a.getMonth()] + ", " + a.getFullYear();
    $("#" + e + " .day").text(o), $("#" + e + " .month-year").text(t), $("#" + e + " .day-text").text(r)
}

function dateToString(e) {
    return e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
}
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
jQuery(document).ready(function() {
    if ($(".open-booking").size() > 0) {
        $(".open-booking").on("click", function() {
            return $("#booking").addClass("active"), $("#open-menu").addClass("white"), $("#booking a.popup-close").on("click", function() {
                $("#booking").removeClass("active"), $("#open-menu").removeClass("white")
            }), !1
        }), $("#booking #bedroom-select").on("click", function() {
            return $("#booking #bedroom-select span").toggleClass("hide"), $("#booking #bedroom-select-options").slideToggle(300), !1
        }), $("#booking #bedroom-select li").on("click", function() {
            $("#bedroom-select li").removeClass("selected");
            var e = $(this).text(),
                a = $("#booking #bedroom-select span").data("text") + ": " + e;
            $("#booking #bedroom-select span").text(a).addClass("pink"), $(this).addClass("selected")
        });
        var e = new Date,
            a = new Date($("#booking #arrival").data("datearrival")),
            o = new Date($("#booking #arrival").data("datedeparture")),
            r = document.getElementById("arrivalCalendar");
        pickmeup(r, {
            flat: !0,
            format: "Y-m-d",
            min: e,
            mode: "range",
            calendars: 1,
            render: function(r) {
                return r < e ? {
                    disabled: !0,
                    class_name: "date-in-past"
                } : r < o && r > a ? {
                    class_name: "pmu-selected"
                } : {}
            }
        });
        var t = 0;
        r.addEventListener("pickmeup-change", function(e) {
            t % 2 == 0 && $("#arrivalCalendar .pmu-days div").each(function() {
                $(this).removeClass("pmu-selected")
            });
            var r = e.detail.date,
                i = e.detail.formatted_date;
            $("#booking #arrival").toggleClass("active"), $("#booking #departure").toggleClass("active"), updateDate("arrival", r[0]), updateDate("departure", r[1]), $("#booking #arrivaldate").val(i[0]), $("#booking #departuredate").val(i[1]), a = r[0], o = r[1], t % 2 == 1 && ($("#booking #arrivalCalendar").removeClass("visible"), $("#booking #arrival").removeClass("active")), t++
        }), $("#booking #arrival").on("click", function() {
            return $("#arrivalCalendar").addClass("visible"), $("#arrival").addClass("active"), !1
        }), $("#booking #departure").on("click", function() {
            return $("#booking #arrivalCalendar").addClass("visible"), $("#booking #arrival").addClass("active"), !1
        }), $("#booking-form a#valid-calendar").on("click", function() {
            var e = $("#bedroom-select li.selected").text(),
                a = $("#booking #arrivaldate").val(),
                o = $("#booking #departuredate").val();
            return $(this).addClass("loading"), $("#booking-form #msg-booking").removeClass("error").html(""), $.post(ajaxurl, {
                action: "bookingCalendar",
                beds: e,
                arrivaldate: a,
                departuredate: o
            }, function(e) {
                var a = $.parseJSON(e);
                if ("error" == a.type) {
                    $("#booking-form #msg-booking").addClass("error").html(a.msg).slideDown(300);
                    for (var o in a.errFields) console.log(a.errFields[o]), $("#" + a.errFields[o]).addClass("error");
                    $("a#valid-calendar").removeClass("loading")
                } else window.location.href = a.link
            }), !1
        }), $("#booking.popup").on("click", function(e) {
            console.log(e), e.target !== this ? "bedroom-select" != e.target.id && "arrival" != e.target.id && "arrivalCalendar" != e.target.id && "departure" != e.target.id && "valid-calendar" != e.target.id && "popup-footer-right-link" != e.target.id && $("#booking.popup").removeClass("active") : $("#booking.popup").removeClass("active")
        })
    }
});

function resize() {
    hWin = jQuery(window).height(), wWin = jQuery(window).width()
}

function delCookie(e) {
    readCookie(e) && (document.cookie = e + "='';path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT")
}

function readCookie(e) {
    for (var t = escape(e) + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
        for (var l = i[a];
            " " === l.charAt(0);) l = l.substring(1, l.length);
        if (0 === l.indexOf(t)) return unescape(l.substring(t.length, l.length))
    }
    return null
}

function setCookie(e, t) {
    var i = new Date;
    i.setTime(i.getTime() + 864e5), document.cookie = e + "=" + t + ";path=/;expires=" + i.toUTCString()
}
var isMobile = !1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) var isMobile = !0;
var map = "",
    hWin = jQuery(window).height(),
    wWin = jQuery(window).width();
jQuery(document).ready(function() {
    jQuery('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var e = jQuery(this.hash);
            if ((e = e.length ? e : jQuery("[name=" + this.hash.slice(1) + "]")).length) return jQuery("html, body").animate({
                scrollTop: e.offset().top
            }, 600), !1
        }
    }), $(window).bind("load", function() {
        $.localScroll(), $("body").addClass("loaded"), "yes" == $("body").data("request-money") && $.get("https://openexchangerates.org/api/latest.json", {
            app_id: "51c0b25e4e814b0fb1d49d55eb488089"
        }, function(e) {
            $.post(ajaxurl, {
                action: "exchange",
                EUR: e.rates.EUR,
                CAD: e.rates.CAD,
                CHF: e.rates.CHF,
                JPY: e.rates.JPY,
                RUB: e.rates.RUB,
                GBP: e.rates.GBP,
                BRL: e.rates.BRL
            }, function(e) {
                window.location.reload()
            })
        })
    }), $(window).click(function() {
        $("#popup-menu").removeClass("active"), $("#search-results").html("").slideUp(50)
    }), $("#popup-menu").click(function(e) {
        e.stopPropagation()
    }), $("#open-menu").on("click", function() {
        return $("#popup-menu").addClass("active"), !1
    }), $("#close-menu").on("click", function() {
        return $("#popup-menu").removeClass("active"), !1
    }), $("#open-search").on("click", function() {
        return $("#header-logo").removeClass("active"), $("#sticky-search").addClass("active"), $("#close-search").addClass("active"), $("#open-search").removeClass("active"), !1
    }), $("#close-search").on("click", function() {
        return $("#header-logo").addClass("active"), $("#sticky-search").removeClass("active"), $("#open-search").addClass("active"), $("#close-search").removeClass("active"), $("#search-results").html(""), !1
    }), $("#svilla").on("keyup", function() {
        var e = this.value.length,
            t = this.value;
        return $("#search-results").html("").slideUp(50), e > 2 && $.post(ajaxurl, {
            action: "searchautocomplete",
            text: t
        }, function(e) {
            var t = $.parseJSON(e);
            "" != t.html && $("#search-results").html(t.html).slideDown(50)
        }), !1
    }), $("#footer-money").on("change", function() {
        var e = $(this).find("option:selected").val();
        return $("body").fadeOut(300), $.post(ajaxurl, {
            action: "changemonnaie",
            money: e
        }, function(e) {
            window.scrollTo(0, 0), location.reload()
        }), !1
    }), $("#weather a").on("click", function() {
        $("#weather a").removeClass("active"), $(this).addClass("active");
        var e = $(this).data("target");
        return $(".temperature").text($(".temperature").data(e)), !1
    });
    var e = 0;
    if ($(window).scroll(function() {
            var t = $(window).scrollTop();
            t > hWin ? $("#back-to-top").addClass("active") : $("#back-to-top").removeClass("active"), wWin > 1025 && (t < e ? ($("#header-sticky").addClass("active"), $("#listing-filter").removeClass("scroll")) : ($("#header-sticky").removeClass("active"), $("#listing-filter").addClass("scroll"))), e = t
        }), $(".book-villa").on("click", function() {
            return $("#popup-inquire").toggleClass("active"), !1
        }), $(".add-to-fav").on("click", function() {
            console.log("ADD TO FAV");
            var e = $(this).data("id"),
                t = readCookie("fav") ? readCookie("fav") : "";
            setCookie("fav", t = t + e + ","), $(this).parent().find(".add-to-fav").removeClass("active"), $(this).parent().find(".remove-to-fav").addClass("active");
            var i = $("#view-favorite span").text();
            return i = parseInt(i) + 1, $("#view-favorite span").text(i), $("#view-favorite").addClass("animfav"), setTimeout(function() {
                $("#view-favorite").removeClass("animfav")
            }, 600), !1
        }), $(".remove-to-fav").on("click", function() {
            console.log("REMOVE TO FAV");
            var e = $(this).data("id"),
                t = readCookie("fav") ? readCookie("fav") : "";
            setCookie("fav", t = t.replace(e + ",", "")), $(this).parent().find(".remove-to-fav").removeClass("active"), $(this).parent().find(".add-to-fav").addClass("active");
            var i = $("#view-favorite span").text();
            return (i = parseInt(i) - 1) > 1 && (i = 0), $("#view-favorite span").text(i), $("#view-favorite").addClass("animfav"), setTimeout(function() {
                $("#view-favorite").removeClass("animfav")
            }, 600), "fav" == $(this).data("page") && ($("#card-" + e).fadeOut(300), setTimeout(function() {
                $("#card-" + e).remove()
            }, 400)), !1
        }), $("#home").size() > 0) {
         $("#home-entry-content").owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            dots: false,
            mouseDrag: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                770: {
                    items: 3
                }
            }
        }), $("#home-experiences-content").owlCarousel({
            loop: false,
            margin: 0,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                767: {
                    items: 2
                },
                1024: {
                    items: 4
                }
            }
        }), $("#popup-inquire-home a#send-inquire").on("click", function() {
            return $(this).addClass("loading"), $("#inquire-home .error").removeClass("error"), $("#inquire-home #msg-inquire").removeClass("error").html(""), $.post(ajaxurl, {
                action: "inquirehome",
                datas: $("#inquire-home ").serialize()
            }, function(e) {
                var t = $.parseJSON(e);
                if ("error" == t.type) {
                    $("#inquire-home #msg-inquire").addClass("error").html(t.msg).slideDown(300);
                    for (var i in t.errFields) console.log(t.errFields[i]), $("inquire-home #" + t.errFields[i]).addClass("error")
                } else $("#inquire-form").html(t.html), $("a.close-inquire").on("click", function() {
                    return $("#popup-inquire").removeClass("active"), setTimeout(function() {
                        window.location.reload()
                    }, 300), !1
                });
                $("#send-inquire").removeClass("loading")
            }), !1
        }), $("#popup-inquire-home a.popup-close").on("click", function() {
            return $("#popup-inquire-home").removeClass("active"), !1
        }), $("a.service").on("click", function() {
            var e = $(this).data("slide");
            return $("#popup-services").addClass("active"), t.trigger("to.owl.carousel", [e - 1, 0, !0]), $(".service-prev a").removeClass("active"), $("#service-prev-" + e).addClass("active"), $(".service-next a").removeClass("active"), $("#service-next-" + e).addClass("active"), !1
        });
        var t = $("#popup-services-slider");
        t.owlCarousel({
            loop: !1,
            margin: 0,
            nav: !1,
            dots: !1,
            responsive: {
                0: {
                    items: 1
                }
            }
        }), $(document).keyup(function(e) {
            37 == e.keyCode ? (console.log("hbjklhbk"), $("#popup-services-slider .owl-prev").click()) : 39 == e.keyCode && $("#popup-services-slider .owl-next").click()
        }), t.on("changed.owl.carousel", function(e) {
            var t = e.item.index + 1;
            $(".service-prev a").removeClass("active"), $("#service-prev-" + t).addClass("active"), $(".service-next a").removeClass("active"), $("#service-next-" + t).addClass("active")
        }), $(".service-next a,.service-prev a").on("click", function() {
            var e = $(this).data("slide");
            return t.trigger("to.owl.carousel", [e - 1, 300, !0]), $(".service-prev a").removeClass("active"), $("#service-prev-" + e).addClass("active"), $(".service-next a").removeClass("active"), $("#service-next-" + e).addClass("active"), !1
        }), $("#popup-services a.popup-close").on("click", function() {
            return $("#popup-services").removeClass("active"), !1
        }), $("#popup-services").click(function() {
            $("#popup-services").removeClass("active")
        }), $("#popup-services .service-content, #popup-services .service-prev, #popup-services .service-next, #popup-services .owl-prev, #popup-services .owl-next").click(function(e) {
            e.stopPropagation()
        })
    }
    if ($("#listing").size() > 0) {
        $("#open-filter").on("click", function() {
            return $(this).toggleClass("open"), $("#listing-filter").toggleClass("active"), !1
        }), $("#filter-validation a").on("click", function() {
            $("#listing-villa-content").slideUp(300), $("#listing-loading").addClass("active"), $("#listing-villa-content").html("").hide();
            var e = e = collectionTab = "";
            e = $("#listing-filter #select-bedrooms").val(), locationTab = $("#listing-filter #select-location").val(), collectionTab = $("#listing-filter #select-collections").val();
            var t = "";
            if (null != e) {
                for (l = 0; l < e.length; l++) t += e[l] + "|";
                t = t.substring(0, t.length - 1)
            }
            var i = "";
            if (null != locationTab) {
                for (l = 0; l < locationTab.length; l++) i += locationTab[l] + "|";
                i = i.substring(0, i.length - 1)
            }
            var a = "";
            if (null != collectionTab) {
                for (var l = 0; l < collectionTab.length; l++) a += collectionTab[l] + "|";
                a = a.substring(0, a.length - 1)
            }
            return $.post(ajaxurl, {
                action: "filterlisting",
                dateArrival: $("#listing-filter #input-arrival").val(),
                dateDeparture: $("#listing-filter #input-departure").val(),
                priceMin: $("#listing-filter #price-min span").text(),
                priceMax: $("#listing-filter #price-max span").text(),
                bedroom: t,
                location: i,
                collection: a,
                tri: $("#filter-tri").val()
            }, function(e) {
                var t = $.parseJSON(e);
                $("#header-date #header-date-from").text(t.dateArrival), $("#header-date #header-date-to").text(t.dateDeparture), $("#listing-villa-content").html(t.html).slideDown(200), $("#listing-loading").removeClass("active"), $("#listing-header-content #nbresults").text(t.nbresults)
            }), !1
        }), $("#filter-reset a").on("click", function() {
            $("#select-bedrooms").select2("val", "All"), $("#select-collections").select2("val", "All"), $("#select-location").select2("val", "All"), document.getElementById("slider-price").noUiSlider.reset(), $("#price-min span").text("1000"), $("#price-max span").text("50000"), $("#input-arrival").val(""), $("#input-departure").val(""), $("#listing-villa-content").slideUp(300), $("#listing-loading").addClass("active"), $("#listing-villa-content").html("").hide();
            var e = e = collectionTab = "";
            e = $("#listing-filter #select-bedrooms").val(), locationTab = $("#listing-filter #select-location").val(), collectionTab = $("#listing-filter #select-collections").val();
            var t = "";
            if (null != e) {
                for (l = 0; l < e.length; l++) t += e[l] + "|";
                t = t.substring(0, t.length - 1)
            }
            var i = "";
            if (null != locationTab) {
                for (l = 0; l < locationTab.length; l++) i += locationTab[l] + "|";
                i = i.substring(0, i.length - 1)
            }
            var a = "";
            if (null != collectionTab) {
                for (var l = 0; l < collectionTab.length; l++) a += collectionTab[l] + "|";
                a = a.substring(0, a.length - 1)
            }
            return $.post(ajaxurl, {
                action: "filterlisting",
                dateArrival: $("#listing-filter #input-arrival").val(),
                dateDeparture: $("#listing-filter #input-departure").val(),
                priceMin: $("#listing-filter #price-min span").text(),
                priceMax: $("#listing-filter #price-max span").text(),
                bedroom: t,
                location: i,
                collection: a,
                tri: $("#filter-tri").val()
            }, function(e) {
                var t = $.parseJSON(e);
                $("#header-date #header-date-from").text(t.dateArrival), $("#header-date #header-date-to").text(t.dateDeparture), $("#listing-villa-content").html(t.html).slideDown(200), $("#listing-loading").removeClass("active"), $("#listing-header-content #nbresults").text(t.nbresults)
            }), !1
        }), $("#filter-tri").on("change", function() {
            $("#listing-villa-content").slideUp(300), $("#listing-loading").addClass("active"), $("#listing-villa-content").html("").hide();
            var e = e = collectionTab = "";
            e = $("#listing-filter #select-bedrooms").val(), locationTab = $("#listing-filter #select-location").val(), collectionTab = $("#listing-filter #select-collections").val();
            var t = "";
            if (null != e) {
                for (l = 0; l < e.length; l++) t += e[l] + "|";
                t = t.substring(0, t.length - 1)
            }
            var i = "";
            if (null != locationTab) {
                for (l = 0; l < locationTab.length; l++) i += locationTab[l] + "|";
                i = i.substring(0, i.length - 1)
            }
            var a = "";
            if (null != collectionTab) {
                for (var l = 0; l < collectionTab.length; l++) a += collectionTab[l] + "|";
                a = a.substring(0, a.length - 1)
            }
            return $.post(ajaxurl, {
                action: "filterlisting",
                dateArrival: $("#listing-filter #input-arrival").val(),
                dateDeparture: $("#listing-filter #input-departure").val(),
                priceMin: $("#listing-filter #price-min span").text(),
                priceMax: $("#listing-filter #price-max span").text(),
                bedroom: t,
                location: i,
                collection: a,
                tri: $("#filter-tri").val()
            }, function(e) {
                var t = $.parseJSON(e);
                $("#header-date #header-date-from").text(t.dateArrival), $("#header-date #header-date-to").text(t.dateDeparture), $("#listing-villa-content").html(t.html).slideDown(200), $("#listing-loading").removeClass("active"), $("#listing-header-content #nbresults").text(t.nbresults)
            }), !1
        }), $("#open-map").on("click", function() {
            $(this).toggleClass("active"), $("#open-grid").toggleClass("active"), $("#listing-content").toggleClass("map");
            var e = v.getCenter();
            return v.setCenter(e), v.setZoom(14), !1
        }), $("#open-grid").on("click", function() {
            return $(this).toggleClass("active"), $("#open-map").toggleClass("active"), $("#listing-content").toggleClass("map"), !1
        });
        var i = new Date,
            a = new Date($("#single-booking").data("datearrival")),
            l = new Date($("#single-booking").data("datedeparture")),
            o = document.getElementById("arrival");
        pickmeup(o, {
            format: "Y-m-d",
            hide_on_select: !0
        }), o.addEventListener("pickmeup-change", function(e) {
            var t = e.detail.date;
            e.detail.formatted_date;
            pickmeup(d).set_date(t), pickmeup(d).show()
        });
        d = document.getElementById("departure");
        pickmeup(d, {
            format: "Y-m-d",
            hide_on_select: !0
        }), $("#filter-money").on("change", function() {
            var e = $(this).find("option:selected").val();
            return $(".card-content-right b").removeClass("active"), $(".card-content-right b." + e).addClass("active"), $(".card-content-right em").removeClass("active"), $(".card-content-right em." + e).addClass("active"), !1
        }), $("#form-contact a#submit-inquiry").on("click", function() {
            return $(this).addClass("loading"), $("#form-contact .error").removeClass("error"), $("#form-contact #msg").removeClass("error").html(""), $.post(ajaxurl, {
                action: "contactrental",
                datas: $("#form-contact").serialize()
            }, function(e) {
                var t = $.parseJSON(e);
                if ("error" == t.type) {
                    $("#form-contact #msg").addClass("error").html(t.msg).slideDown(300);
                    for (var i in t.errFields) console.log(t.errFields[i]), $("#form-contact #" + t.errFields[i]).addClass("error")
                } else $("#form-contact #msg").addClass("succeed").html(t.msg).slideDown(300), setTimeout(function() {
                    $("#form-contact #msg").removeClass("succeed").html("").slideUp(300)
                }, 6e3);
                $("a#submit-inquiry").removeClass("loading")
            }), !1
        }), isMobile || $(window).scroll(function() {
            $("#listing-content").hasClass("map") && ($(window).scrollTop() > $("#listing-content").offset().top - 60 ? $("#listing-map #ggmap").addClass("fixed") : $("#listing-map #ggmap").removeClass("fixed"))
        });
        new google.maps.LatLng("17.9", "-62.833333");
        var s = {
                zoom: 14,
                center: new google.maps.LatLng("17.9", "-62.833333"),
                mapTypeControl: !1,
                scrollwheel: !1,
                draggable: !0,
                panControl: !1,
                scaleControl: !1,
                zoomControl: !0,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                streetViewControl: !1,
                navigationControl: !1,
                mapTypeId: google.maps.MapTypeId.SATELITE
            },
            r = [{
                featureType: "all",
                elementType: "all",
                stylers: [{
                    visibility: "on"
                }]
            }, {
                featureType: "all",
                elementType: "geometry",
                stylers: [{
                    visibility: "on"
                }]
            }, {
                featureType: "all",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }, {
                    hue: "#ff0000"
                }]
            }, {
                featureType: "all",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "administrative.province",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 65
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }]
            }, {
                featureType: "landscape",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }]
            }, {
                featureType: "landscape.natural",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 51
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "poi",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#1c1b1b"
                }, {
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "labels",
                stylers: [{
                    weight: "0.01"
                }, {
                    saturation: "-26"
                }, {
                    gamma: "0.00"
                }, {
                    visibility: "off"
                }, {
                    color: "#8b8b8b" 
                }]
            }, {
                featureType: "road",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }, {
                    invert_lightness: !0
                }, {
                    color: "#fafafa"
                }]
            }, {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "road.highway",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.highway.controlled_access",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 30
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.local",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 40
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "road.local",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{
                    color: "#000000"
                }]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    lightness: -25
                }, {
                    saturation: -97
                }, {
                    color: "#d8d8d8"
                }]
            }, {
                featureType: "water",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }, {
                    lightness: -25
                }, {
                    saturation: -100
                }]
            }];
        (v = new google.maps.Map(document.getElementById("ggmap"), s)).setOptions({
            styles: r
        }), google.maps.event.addDomListener(window, "resize", function() {
            var e = v.getCenter();
            google.maps.event.trigger(v, "resize"), v.setCenter(e)
        }), markers = [], tabinfowindow = [], $("#listing-villa-content article").each(function() {
            var e = $(this).data("latitude"),
                t = $(this).data("longitude"),
                i = $(this).data("title"),
                a = $(this).data("img"),
                l = $(this).data("link"),
                o = $(this).data("bedrooms"),
                s = $(this).data("pools"),
                r = $(this).data("location"),
                n = new google.maps.LatLng(e, t),
                c = new google.maps.Marker({
                    position: n,
                    icon: "/wp-content/themes/onestbarth/dist/img/marker.png"
                });
            markers.push(c);
            var p = '<a href="' + l + '" class="mapinfo">\t<img src="' + a + '"/>\t<strong>' + i + "</strong>\t<p>" + o + " bedrooms, " + s + " pools, " + r + "</p></a>",
                d = new google.maps.InfoWindow({
                    content: p
                });
            google.maps.event.addListener(d, "domready", function() {
                var e = $(".gm-style-iw"),
                    t = e.prev();
                t.children(":nth-child(2)").css({
                    display: "none"
                }), t.children(":nth-child(4)").css({
                    display: "none"
                }), e.parent().parent().css({
                    left: "27px",
                    top: "20px"
                }), t.children(":nth-child(1)").attr("style", function(e, t) {
                    return t + "left: 90px !important;"
                }), t.children(":nth-child(3)").attr("style", function(e, t) {
                    return t + "left: 90px !important;"
                }), t.children(":nth-child(3)").find("div").children().css({
                    "box-shadow": "rgba(255, 163, 163, 0.4) 0px 0px 10px",
                    "z-index": "1"
                }), e.next().css({
                    opacity: "1",
                    right: "55px",
                    top: "15px"
                })
            }), tabinfowindow.push(d), c.addListener("click", function() {
                d.open(v, c)
            })
        }), $("#listing-villa-content article").on("click", function() {
            var e = $(this).data("idmarker");
            tabinfowindow[e].open(v, markers[e])
        });
        n = [{
            textColor: "#55c1cd",
            textSize: 16,
            url: "/wp-content/themes/onestbarth/dist/img/marker.png",
            height: 86,
            width: 40
        }], new MarkerClusterer(v, markers, {
            imagePath: "/wp-content/themes/onestbarth/dist/img/marker.png",
            styles: n
        })
    }
    if ($("#suggestion").size() > 0) {
        $("#open-map").on("click", function() {
            return $(this).toggleClass("active"), $("#open-grid").toggleClass("active"), $("#suggestion-content").toggleClass("map"), !1
        }), $("#open-grid").on("click", function() {
            return $(this).toggleClass("active"), $("#open-map").toggleClass("active"), $("#suggestion-content").toggleClass("map"), !1
        }), $("#filter-money").on("change", function() {
            var e = $(this).find("option:selected").val();
            return $(".card-content-right b").removeClass("active"), $(".card-content-right b." + e).addClass("active"), $(".card-content-right em").removeClass("active"), $(".card-content-right em." + e).addClass("active"), $("article.card .total-villa").removeClass("active"), $("article.card .total-villa.total-" + e).addClass("active"), !1
        }), $("#filter-tri").on("change", function() {
            return $("#suggestion-villa-content").slideUp(300), $("#suggestion-loading").addClass("active"), $("#suggestion-villa-content").html("").hide(), $.post(ajaxurl, {
                action: "filterlistingsuggestion",
                villas: $("#filter-tri").data("villa"),
                tri: $("#filter-tri").val()
            }, function(e) {
                var t = $.parseJSON(e);
                $("#suggestion-villa-content").html(t.html).slideDown(200), $("#suggestion-loading").removeClass("active"), $("#suggestion-header-content #nbresults").text(t.nbresults)
            }), !1
        }), $(window).scroll(function() {
            $("#suggestion-content").hasClass("map") && ($(window).scrollTop() > $("#suggestion-content").offset().top - 60 ? $("#suggestion-map #ggmap").addClass("fixed") : $("#suggestion-map #ggmap").removeClass("fixed"))
        });
        new google.maps.LatLng("17.9", "-62.833333");
        var s = {
                zoom: 14,
                center: new google.maps.LatLng("17.9", "-62.833333"),
                mapTypeControl: !1,
                scrollwheel: !1,
                draggable: !0,
                panControl: !1,
                scaleControl: !1,
                zoomControl: !0,
                streetViewControl: !1,
                navigationControl: !1,
                mapTypeId: google.maps.MapTypeId.SATELITE
            },
            r = [{
                featureType: "all",
                elementType: "all",
                stylers: [{
                    visibility: "on"
                }]
            }, {
                featureType: "all",
                elementType: "geometry",
                stylers: [{
                    visibility: "on"
                }]
            }, {
                featureType: "all",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }, {
                    hue: "#ff0000"
                }]
            }, {
                featureType: "all",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "administrative.province",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 65
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }]
            }, {
                featureType: "landscape",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }]
            }, {
                featureType: "landscape.natural",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 51
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "poi",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#1c1b1b"
                }, {
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "labels",
                stylers: [{
                    weight: "0.01"
                }, {
                    saturation: "-26"
                }, {
                    gamma: "0.00"
                }, {
                    visibility: "off"
                }, {
                    color: "#8b8b8b"
                }]
            }, {
                featureType: "road",
                elementType: "labels.text",
                stylers: [{
                    visibility: "off"
                }, {
                    invert_lightness: !0
                }, {
                    color: "#fafafa"
                }]
            }, {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "road.highway",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.highway.controlled_access",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 30
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "road.local",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 40
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "road.local",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{
                    color: "#000000"
                }]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    lightness: -25
                }, {
                    saturation: -97
                }, {
                    color: "#d8d8d8"
                }]
            }, {
                featureType: "water",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }, {
                    lightness: -25
                }, {
                    saturation: -100
                }]
            }];
        (v = new google.maps.Map(document.getElementById("ggmap"), s)).setOptions({
            styles: r
        }), google.maps.event.addDomListener(window, "resize", function() {
            var e = v.getCenter();
            google.maps.event.trigger(v, "resize"), v.setCenter(e)
        }), markers = [], tabinfowindow = [], $("#suggestion-villa-content article").each(function() {
            var e = $(this).data("latitude"),
                t = $(this).data("longitude"),
                i = $(this).data("title"),
                a = $(this).data("img"),
                l = $(this).data("link"),
                o = $(this).data("bedrooms"),
                s = $(this).data("pools"),
                r = $(this).data("location"),
                n = new google.maps.LatLng(e, t),
                c = new google.maps.Marker({
                    position: n,
                    icon: "/wp-content/themes/onestbarth/dist/img/marker.png"
                });
            markers.push(c);
            var p = '<a href="' + l + '" class="mapinfo">\t<img src="' + a + '"/>\t<strong>' + i + "</strong>\t<p>" + o + " bedrooms, " + s + " pools, " + r + "</p></a>",
                d = new google.maps.InfoWindow({
                    content: p
                });
            google.maps.event.addListener(d, "domready", function() {
                var e = $(".gm-style-iw"),
                    t = e.prev();
                t.children(":nth-child(2)").css({
                    display: "none"
                }), t.children(":nth-child(4)").css({
                    display: "none"
                }), e.parent().parent().css({
                    left: "27px",
                    top: "20px"
                }), t.children(":nth-child(1)").attr("style", function(e, t) {
                    return t + "left: 90px !important;"
                }), t.children(":nth-child(3)").attr("style", function(e, t) {
                    return t + "left: 90px !important;"
                }), t.children(":nth-child(3)").find("div").children().css({
                    "box-shadow": "rgba(255, 163, 163, 0.4) 0px 0px 10px",
                    "z-index": "1"
                }), e.next().css({
                    opacity: "1",
                    right: "55px",
                    top: "15px"
                })
            }), tabinfowindow.push(d), c.addListener("click", function() {
                d.open(v, c)
            })
        }), $("#suggestion-villa-content article").on("click", function() {
            var e = $(this).data("idmarker");
            tabinfowindow[e].open(v, markers[e])
        });
        var n = [{
            textColor: "#55c1cd",
            textSize: 16,
            url: "/wp-content/themes/onestbarth/dist/img/marker.png",
            height: 86,
            width: 40
        }];
        new MarkerClusterer(v, markers, {
            imagePath: "/wp-content/themes/onestbarth/dist/img/marker.png",
            styles: n
        })
    }
    if ($(".single-villa").size() > 0) {
        $(window).width() > 1025 && !isMobile && $(".parallax-container").parallax(), $("h3.click").on("click", function() {
            return $(this).parent().parent().parent().toggleClass("open"), $(this).addClass("open"), !1
        }), $(".content-title-services a").on("click", function() {
            var e = $(this).attr("id").replace("link-", "");
            return $(".content-title-services a").removeClass("active"), $(this).addClass("active"), $("#single-services-content > div").removeClass("active"), $("#" + e).addClass("active"), !1
        }), $(".single-slider .owl-carousel").owlCarousel({
            loop: !0,
            margin: 0,
            nav: !1,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            dots: !0,
            responsive: {
                0: {
                    items: 1
                }
            }
        });
        new google.maps.LatLng($(".single-villa").data("latitude"), $(".single-villa").data("longitude"));
        var s = {
                zoom: 15,
                center: new google.maps.LatLng($(".single-villa").data("latitude"), $(".single-villa").data("longitude")),
                mapTypeControl: !1,
                scrollwheel: !1,
                draggable: !0,
                panControl: !1,
                scaleControl: !1,
                zoomControl: !1,
                streetViewControl: !1,
                navigationControl: !1,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            r = [
                {
                    "featureType": "administrative",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 65
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": "50"
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "30"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "40"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#ffff00"
                        },
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -97
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -100
                        }
                    ]
                }
            ];
        (v = new google.maps.Map(document.getElementById("single-ggmap"), s)).setOptions({
            styles: r
        }), google.maps.event.addDomListener(window, "resize", function() {
            var e = v.getCenter();
            google.maps.event.trigger(v, "resize"), v.setCenter(e)
        });
        new google.maps.Marker({
            position: new google.maps.LatLng($(".single-villa").data("latitude"), $(".single-villa").data("longitude")),
            map: v,
            icon: "/wp-content/themes/onestbarth/dist/img/icon-ggmap.png",
            title: $(".single-villa").data("title"),
            zIndex: 3
        });
        $("#single-rates #nb_bedrooms").on("change", function() {
            var e = $(this).val();
            return $("#single-rates table tbody tr").hide(), $("#single-rates table tbody tr.nbbed-" + e).show(500), !1
        }), $("#single-rates #money").on("change", function() {
            var e = $(this).val();
            return $("#single-rates .money").removeClass("active"), $("#single-rates ." + e).addClass("active"), !1
        });
        var c = $("#diaporama-villa .owl-carousel");
        if (c.owlCarousel({
                loop: !0,
                margin: 0,
                nav: !0,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                dots: !1,
                keyboard: !0,
                responsive: {
                    0: {
                        items: 1
                    }
                }
            }), $(document).keyup(function(e) {
                37 == e.keyCode ? $("#diaporama-villa-content .owl-prev").click() : 39 == e.keyCode && $("#diaporama-villa-content .owl-next").click()
            }), c.on("changed.owl.carousel", function(e) {
                var t = e.item.index,
                    i = $(e.target).find(".owl-item").eq(t).find(".diapo-content-img").data("catname");
                $("#diaporama-category span").text(i)
            }), $("#floor-plan").on("click", function() {
                return $("#popup-floorplan").addClass("active"), !1
            }), $("#floorplan-close").on("click", function() {
                return $("#popup-floorplan").removeClass("active"), !1
            }), $("a.gallery-category").on("click", function() {
                var e = $(this).data("category"),
                    t = $(this).data("slide");
                $("#diaporama-villa .owl-carousel").trigger("to.owl.carousel", [t, 0, !0]), setTimeout(function() {
                    $("#diaporama-villa").addClass("active")
                }, 300), $("#diaporama-category li").removeClass("selected"), $("#diaporama-category #option-" + e).addClass("selected");
                var i = $(this).data("category");
                return $("#diaporama-category span").text(i), !1
            }), $("a#diaporama").on("click", function() {
                return $("#diaporama-villa .owl-carousel").trigger("to.owl.carousel", [0, 0, !0]), setTimeout(function() {
                    $("#diaporama-villa").addClass("active")
                }, 300), !1
            }), $("#diaporama-category span").on("click", function() {
                return $("#diaporama-category span").toggleClass("hide"), $("#diaporama-category-options").slideToggle(300), !1
            }), $("#diaporama-category li").on("click", function() {
                $("#diaporama-category li").removeClass("selected");
                var e = $(this).text();
                $("#diaporama-category span").text(e), $(this).addClass("selected");
                var t = $(this).data("slide");
                return $("#diaporama-category-options").slideToggle(300), $("#diaporama-villa .owl-carousel").trigger("to.owl.carousel", [t, 300, !0]), !1
            }), $("#diaporama-villa a#diaporama-close").on("click", function() {
                return $("#diaporama-villa").removeClass("active"), !1
            }), $("#diaporama-villa").on("click", function(e) {
                console.log(e), e.target !== this ? "diaporama-villa-header" != e.target.id && "" != e.target.id || "diapo-img" != e.target.className && "fa" != e.target.classList[0] && "owl-next" != e.target.className && "owl-prev" != e.target.className && "owl-stage" != e.target.className && $("#diaporama-villa").removeClass("active") : $("#diaporama-villa").removeClass("active")
            }), $(document).width() > 768) {
            var p = $("#single-booking").offset();
            $(window).scroll(function() {
                console.log(p), $(window).scrollTop() > p.top - 60 ? $("#single-booking").addClass("fixed") : $("#single-booking").removeClass("fixed")
            })
        }
        $("#popup-inquire").on("click", function(e) {
            console.log(e), e.target == this && $("#popup-inquire").removeClass("active")
        });
        var i = new Date,
            a = new Date($("#single-booking").data("datearrival")),
            l = new Date($("#single-booking").data("datedeparture")),
            o = document.getElementById("booking-arrival");
        pickmeup(o, {
            format: "Y-m-d"
        }), o.addEventListener("pickmeup-change", function(e) {
            $.post(ajaxurl, {
                action: "change_arrival_date",
                arrival: $("#booking-arrival").val()
            }, function(e) {
                var t = $.parseJSON(e);
                console.log(t), $(".nbnights-field").text(t.nbnights), $(".subtotal-field").text(t.subtotal), $(".total-field").text(t.total), $(".pricepernight-field").text(t.pricepernight), pickmeup("#popup-booking-arrival").set_date(t.arrival), pickmeup(o).hide(), pickmeup(d).set_date(t.arrival), pickmeup(d).show()
            })
        });
        var d = document.getElementById("booking-departure");
        pickmeup(d, {
            format: "Y-m-d"
        }), d.addEventListener("pickmeup-change", function(e) {
            $.post(ajaxurl, {
                action: "change_departure_date",
                departure: $("#booking-departure").val()
            }, function(e) {
                var t = $.parseJSON(e);
                console.log(t), $(".nbnights-field").text(t.nbnights), $(".subtotal-field").text(t.subtotal), $(".total-field").text(t.total), $(".pricepernight-field").text(t.pricepernight), pickmeup("#popup-booking-departure").set_date(t.departure)
            }), pickmeup(d).hide()
        }), $("#popup-booking-bedrooms").on("change", function() {
            var e = $(this).val();
            $.post(ajaxurl, {
                action: "change_nbbedrooms",
                bedrooms: e
            }, function(e) {
                var t = $.parseJSON(e);
                console.log(t), $(".nbbeds-field").text(t.nbbeds), $(".subtotal-field").text(t.subtotal), $(".total-field").text(t.total), $(".pricepernight-field").text(t.pricepernight)
            }), $("#popup-booking-bedrooms").find('option[value="' + e + '"]').prop("selected", !0), $("#booking-bedrooms").find("li.nb-" + e).addClass("selected"), $("#nb-booking-bedrooms").val(e)
        }), $("#booking-bedrooms span").on("click", function() {
            return $("#booking-bedrooms span").toggleClass("hide"), $("#booking-bedrooms-options").slideToggle(300), !1
        }), $("#booking-bedrooms li").on("click", function() {
            $("#booking-bedrooms li").removeClass("selected");
            var e = $(this).text(),
                t = $("#booking-bedrooms span").data("text");
            $("#booking-bedrooms span").html(e + " " + t), $(this).addClass("selected");
            $(this).data("slide");
            return $("#booking-bedrooms-options").slideToggle(300), $("#nb-booking-bedrooms").val(e), $.post(ajaxurl, {
                action: "change_nbbedrooms",
                bedrooms: e
            }, function(e) {
                var t = $.parseJSON(e);
                console.log(t), $(".nbbeds-field").text(t.nbbeds), $(".subtotal-field").text(t.subtotal), $(".total-field").text(t.total), $(".pricepernight-field").text(t.pricepernight)
            }), $("#popup-booking-bedrooms").find('option[value="' + e + '"]').prop("selected", !0), $("#booking-bedrooms").find("li.nb-" + e).addClass("selected"), $("#nb-booking-bedrooms").val(e), !1
        }), $("#open-inquire").on("click", function() {
            return $("#popup-inquire").addClass("active"), !1
        }), $("a#single-booking-close").on("click", function() {
            return $("#single-booking").removeClass("active"), !1
        });
        var f = document.getElementById("popup-booking-arrival");
        pickmeup(f, {
            format: "Y-m-d"
        }), f.addEventListener("pickmeup-change", function(e) {
            $.post(ajaxurl, {
                action: "change_arrival_date",
                arrival: $("#popup-booking-arrival").val()
            }, function(e) {
                var t = $.parseJSON(e);
                console.log(t), $(".nbnights-field").text(t.nbnights), $(".subtotal-field").text(t.subtotal), $(".total-field").text(t.total), $(".pricepernight-field").text(t.pricepernight), pickmeup("#booking-arrival").set_date(t.arrival)
            }), pickmeup(f).hide()
        });
        var m = document.getElementById("popup-booking-departure");
        pickmeup(m, {
            format: "Y-m-d"
        }), m.addEventListener("pickmeup-change", function(e) {
            $.post(ajaxurl, {
                action: "change_departure_date",
                departure: $("#popup-booking-departure").val()
            }, function(e) {
                var t = $.parseJSON(e);
                console.log(t), $(".nbnights-field").text(t.nbnights), $(".subtotal-field").text(t.subtotal), $(".total-field").text(t.total), $(".pricepernight-field").text(t.pricepernight), pickmeup("#booking-departure").set_date(t.departure)
            }), pickmeup(m).hide()
        }), $("#booking-inquire").on("click", function() {
            return $("#popup-inquire").addClass("active"), !1
        }), $("#popup-inquire a.popup-close").on("click", function() {
            return $("#popup-inquire").removeClass("active"), !1
        }), $("#popup-inquire a#send-inquire").on("click", function() {
            return $(this).addClass("loading"), $("#inquire-villa .error").removeClass("error"), $("#inquire-villa #msg-inquire").removeClass("error").html(""), $.post(ajaxurl, {
                action: "inquire",
                datas: $("#inquire-villa ").serialize()
            }, function(e) {
                var t = $.parseJSON(e);
                if ("error" == t.type) {
                    $("#inquire-villa #msg-inquire").addClass("error").html(t.msg).slideDown(300);
                    for (var i in t.errFields) console.log(t.errFields[i]), $("inquire-villa #" + t.errFields[i]).addClass("error")
                } else $("#inquire-form").html(t.html), $("a.close-inquire").on("click", function() {
                    return $("#popup-inquire").removeClass("active"), setTimeout(function() {
                        window.location.reload()
                    }, 300), !1
                });
                $("#send-inquire").removeClass("loading")
            }), !1
        })
    }
    if ($("#listing-filter").size() > 0) {
        var i = new Date,
            a = new Date($("#filter-date").data("datearrival")),
            l = new Date($("#filter-date").data("datedeparture")),
            o = document.getElementById("filter-date");
        pickmeup(o, {
            flat: !0,
            format: "Y-m-d",
            min: i,
            hide_on_select: !0,
            mode: "range",
            calendars: 2,
            render: function(e) {
                return e < i ? {
                    disabled: !0,
                    class_name: "date-in-past"
                } : e < l && e > a ? {
                    class_name: "pmu-selected"
                } : {}
            }
        });
        var u = 0;
        o.addEventListener("pickmeup-change", function(e) {
            u % 2 == 0 && $("#filter-date .pmu-days div").each(function() {
                $(this).removeClass("pmu-selected")
            });
            var t = e.detail.date,
                i = e.detail.formatted_date;
            $("#input-arrival").val(i[0]), $("#input-departure").val(i[1]), a = t[0], l = t[1], u % 2 == 1 && $("#filter-date").removeClass("visible"), u++
        }), $("#filter-date").on("click", function() {
            return $(this).addClass("visible"), !1
        }), $(".customselect").each(function() {
            $(this).select2({
                placeholder: $(this).data("placeholder")
            })
        }), $(window).on("click", function(e) {
            console.log(e), e.target !== this && "filter-date" != e.target.id && $("#filter-date").removeClass("visible")
        });
        var g = document.getElementById("slider-price");
        noUiSlider.create(g, {
            start: [0, 1e4],
            step: 100,
            connect: !0,
            range: {
                min: 0,
                max: 1e4
            }
        }), g.noUiSlider.on("slide", function(e) {
            $("#price-min span").text(e[0]), $("#price-max span").text(e[1])
        }), $(".select2-multiple").each(function() {
            var e = $(this).data("placeholder");
            $(this).select2MultiCheckboxes({
                templateSelection: function(t, i) {
                    return 0 == t ? e : "Selected " + t.length + " of " + i
                }
            })
        })
    }
    if ($("#favorite").size() > 0 && (pickmeup("#arrival", {
            format: "Y-m-d"
        }), pickmeup("#departure", {
            format: "Y-m-d"
        }), $("#form-favorite a#submit-inquiry").on("click", function() {
            return $(this).addClass("loading"), $("#form-favorite .error").removeClass("error"), $("#form-favorite #msg").removeClass("error").html(""), $.post(ajaxurl, {
                action: "formfavorite",
                datas: $("#form-favorite").serialize()
            }, function(e) {
                var t = $.parseJSON(e);
                if ("error" == t.type) {
                    $("#form-favorite #msg").addClass("error").html(t.msg).slideDown(300);
                    for (var i in t.errFields) console.log(t.errFields[i]), $("#form-favorite #" + t.errFields[i]).addClass("error")
                } else $("#form-favorite #msg").addClass("succeed").html(t.msg).slideDown(300), setTimeout(function() {
                    $("#form-favorite #msg").removeClass("succeed").html("").slideUp(300)
                }, 6e3);
                $("a#submit-inquiry").removeClass("loading")
            }), !1
        }), $("#popup-favoris").on("click", function(e) {
            console.log(e), e.target == this && $("#popup-favoris").removeClass("active")
        }), $("#remove-all").on("click", function() {
            return setCookie("fav", ""), $(".card").fadeOut(300), $("#view-favorite span").text("0"), $("#view-favorite").addClass("animfav"), setTimeout(function() {
                window.location.reload(!1)
            }, 400), !1
        }), $("#share-favorite").on("click", function() {
            return $("#popup-favoris").addClass("active"), !1
        }), $("#popup-favoris a#send-popup-favoris").on("click", function() {
            return $(this).addClass("loading"), $("input.error").removeClass("error"), $("#msg-favoris").removeClass("error").html(""), $.post(ajaxurl, {
                action: "sharefavorite",
                datas: $("#popup-favoris-share").serialize()
            }, function(e) {
                var t = $.parseJSON(e);
                if ("error" == t.type) {
                    $("#popup-favoris-share #msg-popup-favoris").addClass("error").html(t.msg).slideDown(300);
                    for (var i in t.errFields) console.log(t.errFields[i]), $("#popup-favoris-share #" + t.errFields[i]).addClass("error")
                } else $("#popup-favoris-share").html(t.html), $("a.close-popup-favoris").on("click", function() {
                    return $("#popup-favoris-share").removeClass("active"), setTimeout(function() {
                        window.location.reload()
                    }, 300), !1
                });
                $("#send-popup-favoris").removeClass("loading")
            }), !1
        }), $("#popup-favoris a.popup-close").on("click", function() {
            return $("#popup-favoris").removeClass("active"), !1
        })), $("#template-contact").size() > 0) {
        new google.maps.LatLng(17.8964345, -62.85220099999998);
        var s = {
                zoom: 15,
                center: new google.maps.LatLng(17.8964345, -62.85220099999998),
                mapTypeControl: !1,
                scrollwheel: !1,
                draggable: !0,
                panControl: !1,
                scaleControl: !1,
                zoomControl: !1,
                streetViewControl: !1,
                navigationControl: !1,
                legend: {
                    position: "none"
                },
                mapTypeId: google.maps.MapTypeId.SATELITE
            },
            r = [
                {
                    "featureType": "administrative",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 65
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": "50"
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "30"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "40"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#ffff00"
                        },
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -97
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -100
                        }
                    ]
                }
            ],
            v = new google.maps.Map(document.getElementById("ggmap"), s);
        v.setOptions({
            styles: r
        }), google.maps.event.addDomListener(window, "resize", function() {
            var e = v.getCenter();
            google.maps.event.trigger(v, "resize"), v.setCenter(e)
        });
        new google.maps.Marker({
            position: new google.maps.LatLng(17.8964345, -62.85220099999998),
            map: v,
            icon: "/wp-content/themes/onestbarth/dist/img/ggmap-picto.png",
            title: "OneStBarts",
            zIndex: 3
        });
        $("#contact-form a#valider-contact").on("click", function() {
            return $(this).addClass("loading"), $("#contact-form  .error").removeClass("error"), $("#contact-form  #msg-contact").removeClass("error").html(""), $.post(ajaxurl, {
                action: "form_contact",
                datas: $("#contact-form ").serialize()
            }, function(e) {
                var t = $.parseJSON(e);
                if ("error" == t.type) {
                    $("#contact-form #msg-contact").addClass("error").html(t.msg).slideDown(300);
                    for (var i in t.errFields) console.log(t.errFields[i]), $("#contact-form #contact-" + t.errFields[i]).addClass("error")
                } else $("#contact-form #msg-contact").addClass("succeed").html(t.msg).slideDown(300), setTimeout(function() {
                    $("#contact-form #msg-contact").removeClass("succeed").html("").slideUp(300)
                }, 6e3);
                $("#contact-form a#valider-contact").removeClass("loading")
            }), !1
        })
    }
    $("#template-transfert").size() > 0 && ($(".article-slider").owlCarousel({
        loop: !0,
        margin: 0,
        nav: !0,
        dots: !1,
        responsive: {
            0: {
                items: 1
            }
        }
    }), $("#transfert-form a#valider-transfert").on("click", function() {
        return $(this).addClass("loading"), $("#transfert-form  .error").removeClass("error"), $("#transfert-form  #msg-transfert").removeClass("error").html(""), $.post(ajaxurl, {
            action: "form_transfert",
            datas: $("#transfert-form ").serialize()
        }, function(e) {
            var t = $.parseJSON(e);
            if ("error" == t.type) {
                $("#transfert-form #msg-transfert").addClass("error").html(t.msg).slideDown(300);
                for (var i in t.errFields) console.log(t.errFields[i]), $("#transfert-form #transfert-" + t.errFields[i]).addClass("error")
            } else $("#transfert-form #msg-transfert").addClass("succeed").html(t.msg).slideDown(300), setTimeout(function() {
                $("#transfert-form #msg-transfert").removeClass("succeed").html("").slideUp(300)
            }, 6e3);
            $("#transfert-form a#valider-transfert").removeClass("loading")
        }), !1
    })), $("#template-philosophy").size() > 0 && $("#philosophy-collections .owl-carousel").owlCarousel({
        loop: !0,
        margin: 0,
        nav: !0,
        dots: !1,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    }), resize(), jQuery(window).bind("debouncedresize", function() {
        resize()
    })
});

function MarkerClusterer(t, e, r) {
    this.extend(MarkerClusterer, google.maps.OverlayView), this.map_ = t, this.markers_ = [], this.clusters_ = [], this.sizes = [53, 56, 66, 78, 90], this.styles_ = [], this.ready_ = !1;
    var s = r || {};
    this.gridSize_ = s.gridSize || 60, this.minClusterSize_ = s.minimumClusterSize || 2, this.maxZoom_ = s.maxZoom || null, this.styles_ = s.styles || [], this.imagePath_ = s.imagePath || this.MARKER_CLUSTER_IMAGE_PATH_, this.imageExtension_ = s.imageExtension || this.MARKER_CLUSTER_IMAGE_EXTENSION_, this.zoomOnClick_ = !0, void 0 != s.zoomOnClick && (this.zoomOnClick_ = s.zoomOnClick), this.averageCenter_ = !1, void 0 != s.averageCenter && (this.averageCenter_ = s.averageCenter), this.setupStyles_(), this.setMap(t), this.prevZoom_ = this.map_.getZoom();
    var o = this;
    google.maps.event.addListener(this.map_, "zoom_changed", function() {
        var t = o.map_.getZoom();
        o.prevZoom_ != t && (o.prevZoom_ = t, o.resetViewport())
    }), google.maps.event.addListener(this.map_, "idle", function() {
        o.redraw()
    }), e && e.length && this.addMarkers(e, !1)
}

function Cluster(t) {
    this.markerClusterer_ = t, this.map_ = t.getMap(), this.gridSize_ = t.getGridSize(), this.minClusterSize_ = t.getMinClusterSize(), this.averageCenter_ = t.isAverageCenter(), this.center_ = null, this.markers_ = [], this.bounds_ = null, this.clusterIcon_ = new ClusterIcon(this, t.getStyles(), t.getGridSize())
}

function ClusterIcon(t, e, r) {
    t.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView), this.styles_ = e, this.padding_ = r || 0, this.cluster_ = t, this.center_ = null, this.map_ = t.getMap(), this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(this.map_)
}
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = "../images/m", MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png", MarkerClusterer.prototype.extend = function(t, e) {
    return function(t) {
        for (var e in t.prototype) this.prototype[e] = t.prototype[e];
        return this
    }.apply(t, [e])
}, MarkerClusterer.prototype.onAdd = function() {
    this.setReady_(!0)
}, MarkerClusterer.prototype.draw = function() {}, MarkerClusterer.prototype.setupStyles_ = function() {
    if (!this.styles_.length)
        for (var t, e = 0; t = this.sizes[e]; e++) this.styles_.push({
            url: this.imagePath_ + (e + 1) + "." + this.imageExtension_,
            height: t,
            width: t
        })
}, MarkerClusterer.prototype.fitMapToMarkers = function() {
    for (var t, e = this.getMarkers(), r = new google.maps.LatLngBounds, s = 0; t = e[s]; s++) r.extend(t.getPosition());
    this.map_.fitBounds(r)
}, MarkerClusterer.prototype.setStyles = function(t) {
    this.styles_ = t
}, MarkerClusterer.prototype.getStyles = function() {
    return this.styles_
}, MarkerClusterer.prototype.isZoomOnClick = function() {
    return this.zoomOnClick_
}, MarkerClusterer.prototype.isAverageCenter = function() {
    return this.averageCenter_
}, MarkerClusterer.prototype.getMarkers = function() {
    return this.markers_
}, MarkerClusterer.prototype.getTotalMarkers = function() {
    return this.markers_.length
}, MarkerClusterer.prototype.setMaxZoom = function(t) {
    this.maxZoom_ = t
}, MarkerClusterer.prototype.getMaxZoom = function() {
    return this.maxZoom_
}, MarkerClusterer.prototype.calculator_ = function(t, e) {
    for (var r = 0, s = t.length, o = s; 0 !== o;) o = parseInt(o / 10, 10), r++;
    return r = Math.min(r, e), {
        text: s,
        index: r
    }
}, MarkerClusterer.prototype.setCalculator = function(t) {
    this.calculator_ = t
}, MarkerClusterer.prototype.getCalculator = function() {
    return this.calculator_
}, MarkerClusterer.prototype.addMarkers = function(t, e) {
    for (var r, s = 0; r = t[s]; s++) this.pushMarkerTo_(r);
    e || this.redraw()
}, MarkerClusterer.prototype.pushMarkerTo_ = function(t) {
    if (t.isAdded = !1, t.draggable) {
        var e = this;
        google.maps.event.addListener(t, "dragend", function() {
            t.isAdded = !1, e.repaint()
        })
    }
    this.markers_.push(t)
}, MarkerClusterer.prototype.addMarker = function(t, e) {
    this.pushMarkerTo_(t), e || this.redraw()
}, MarkerClusterer.prototype.removeMarker_ = function(t) {
    var e = -1;
    if (this.markers_.indexOf) e = this.markers_.indexOf(t);
    else
        for (var r, s = 0; r = this.markers_[s]; s++)
            if (r == t) {
                e = s;
                break
            } return -1 != e && (t.setMap(null), this.markers_.splice(e, 1), !0)
}, MarkerClusterer.prototype.removeMarker = function(t, e) {
    var r = this.removeMarker_(t);
    return !(e || !r) && (this.resetViewport(), this.redraw(), !0)
}, MarkerClusterer.prototype.removeMarkers = function(t, e) {
    for (var r, s = !1, o = 0; r = t[o]; o++) {
        var i = this.removeMarker_(r);
        s = s || i
    }
    if (!e && s) return this.resetViewport(), this.redraw(), !0
}, MarkerClusterer.prototype.setReady_ = function(t) {
    this.ready_ || (this.ready_ = t, this.createClusters_())
}, MarkerClusterer.prototype.getTotalClusters = function() {
    return this.clusters_.length
}, MarkerClusterer.prototype.getMap = function() {
    return this.map_
}, MarkerClusterer.prototype.setMap = function(t) {
    this.map_ = t
}, MarkerClusterer.prototype.getGridSize = function() {
    return this.gridSize_
}, MarkerClusterer.prototype.setGridSize = function(t) {
    this.gridSize_ = t
}, MarkerClusterer.prototype.getMinClusterSize = function() {
    return this.minClusterSize_
}, MarkerClusterer.prototype.setMinClusterSize = function(t) {
    this.minClusterSize_ = t
}, MarkerClusterer.prototype.getExtendedBounds = function(t) {
    var e = this.getProjection(),
        r = new google.maps.LatLng(t.getNorthEast().lat(), t.getNorthEast().lng()),
        s = new google.maps.LatLng(t.getSouthWest().lat(), t.getSouthWest().lng()),
        o = e.fromLatLngToDivPixel(r);
    o.x += this.gridSize_, o.y -= this.gridSize_;
    var i = e.fromLatLngToDivPixel(s);
    i.x -= this.gridSize_, i.y += this.gridSize_;
    var n = e.fromDivPixelToLatLng(o),
        a = e.fromDivPixelToLatLng(i);
    return t.extend(n), t.extend(a), t
}, MarkerClusterer.prototype.isMarkerInBounds_ = function(t, e) {
    return e.contains(t.getPosition())
}, MarkerClusterer.prototype.clearMarkers = function() {
    this.resetViewport(!0), this.markers_ = []
}, MarkerClusterer.prototype.resetViewport = function(t) {
    for (var e, r = 0; e = this.clusters_[r]; r++) e.remove();
    for (var s, r = 0; s = this.markers_[r]; r++) s.isAdded = !1, t && s.setMap(null);
    this.clusters_ = []
}, MarkerClusterer.prototype.repaint = function() {
    var t = this.clusters_.slice();
    this.clusters_.length = 0, this.resetViewport(), this.redraw(), window.setTimeout(function() {
        for (var e, r = 0; e = t[r]; r++) e.remove()
    }, 0)
}, MarkerClusterer.prototype.redraw = function() {
    this.createClusters_()
}, MarkerClusterer.prototype.distanceBetweenPoints_ = function(t, e) {
    if (!t || !e) return 0;
    var r = (e.lat() - t.lat()) * Math.PI / 180,
        s = (e.lng() - t.lng()) * Math.PI / 180,
        o = Math.sin(r / 2) * Math.sin(r / 2) + Math.cos(t.lat() * Math.PI / 180) * Math.cos(e.lat() * Math.PI / 180) * Math.sin(s / 2) * Math.sin(s / 2);
    return 6371 * (2 * Math.atan2(Math.sqrt(o), Math.sqrt(1 - o)))
}, MarkerClusterer.prototype.addToClosestCluster_ = function(t) {
    for (var e, r = 4e4, s = null, o = (t.getPosition(), 0); e = this.clusters_[o]; o++) {
        var i = e.getCenter();
        if (i) {
            var n = this.distanceBetweenPoints_(i, t.getPosition());
            n < r && (r = n, s = e)
        }
    }
    s && s.isMarkerInClusterBounds(t) ? s.addMarker(t) : ((e = new Cluster(this)).addMarker(t), this.clusters_.push(e))
}, MarkerClusterer.prototype.createClusters_ = function() {
    if (this.ready_)
        for (var t, e = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast()), r = this.getExtendedBounds(e), s = 0; t = this.markers_[s]; s++) !t.isAdded && this.isMarkerInBounds_(t, r) && this.addToClosestCluster_(t)
}, Cluster.prototype.isMarkerAlreadyAdded = function(t) {
    if (this.markers_.indexOf) return -1 != this.markers_.indexOf(t);
    for (var e, r = 0; e = this.markers_[r]; r++)
        if (e == t) return !0;
    return !1
}, Cluster.prototype.addMarker = function(t) {
    if (this.isMarkerAlreadyAdded(t)) return !1;
    if (this.center_) {
        if (this.averageCenter_) {
            var e = this.markers_.length + 1,
                r = (this.center_.lat() * (e - 1) + t.getPosition().lat()) / e,
                s = (this.center_.lng() * (e - 1) + t.getPosition().lng()) / e;
            this.center_ = new google.maps.LatLng(r, s), this.calculateBounds_()
        }
    } else this.center_ = t.getPosition(), this.calculateBounds_();
    t.isAdded = !0, this.markers_.push(t);
    var o = this.markers_.length;
    if (o < this.minClusterSize_ && t.getMap() != this.map_ && t.setMap(this.map_), o == this.minClusterSize_)
        for (var i = 0; i < o; i++) this.markers_[i].setMap(null);
    return o >= this.minClusterSize_ && t.setMap(null), this.updateIcon(), !0
}, Cluster.prototype.getMarkerClusterer = function() {
    return this.markerClusterer_
}, Cluster.prototype.getBounds = function() {
    for (var t, e = new google.maps.LatLngBounds(this.center_, this.center_), r = this.getMarkers(), s = 0; t = r[s]; s++) e.extend(t.getPosition());
    return e
}, Cluster.prototype.remove = function() {
    this.clusterIcon_.remove(), this.markers_.length = 0, delete this.markers_
}, Cluster.prototype.getSize = function() {
    return this.markers_.length
}, Cluster.prototype.getMarkers = function() {
    return this.markers_
}, Cluster.prototype.getCenter = function() {
    return this.center_
}, Cluster.prototype.calculateBounds_ = function() {
    var t = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(t)
}, Cluster.prototype.isMarkerInClusterBounds = function(t) {
    return this.bounds_.contains(t.getPosition())
}, Cluster.prototype.getMap = function() {
    return this.map_
}, Cluster.prototype.updateIcon = function() {
    var t = this.map_.getZoom(),
        e = this.markerClusterer_.getMaxZoom();
    if (e && t > e)
        for (var r, s = 0; r = this.markers_[s]; s++) r.setMap(this.map_);
    else if (this.markers_.length < this.minClusterSize_) this.clusterIcon_.hide();
    else {
        var o = this.markerClusterer_.getStyles().length,
            i = this.markerClusterer_.getCalculator()(this.markers_, o);
        this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.setSums(i), this.clusterIcon_.show()
    }
}, ClusterIcon.prototype.triggerClusterClick = function(t) {
    var e = this.cluster_.getMarkerClusterer();
    google.maps.event.trigger(e, "clusterclick", this.cluster_, t), e.isZoomOnClick() && this.map_.fitBounds(this.cluster_.getBounds())
}, ClusterIcon.prototype.onAdd = function() {
    if (this.div_ = document.createElement("DIV"), this.visible_) {
        var t = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(t), this.div_.innerHTML = this.sums_.text
    }
    this.getPanes().overlayMouseTarget.appendChild(this.div_);
    var e = this,
        r = !1;
    google.maps.event.addDomListener(this.div_, "click", function(t) {
        r || e.triggerClusterClick(t)
    }), google.maps.event.addDomListener(this.div_, "mousedown", function() {
        r = !1
    }), google.maps.event.addDomListener(this.div_, "mousemove", function() {
        r = !0
    })
}, ClusterIcon.prototype.getPosFromLatLng_ = function(t) {
    var e = this.getProjection().fromLatLngToDivPixel(t);
    return "object" == typeof this.iconAnchor_ && 2 === this.iconAnchor_.length ? (e.x -= this.iconAnchor_[0], e.y -= this.iconAnchor_[1]) : (e.x -= parseInt(this.width_ / 2, 10), e.y -= parseInt(this.height_ / 2, 10)), e
}, ClusterIcon.prototype.draw = function() {
    if (this.visible_) {
        var t = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = t.y + "px", this.div_.style.left = t.x + "px"
    }
}, ClusterIcon.prototype.hide = function() {
    this.div_ && (this.div_.style.display = "none"), this.visible_ = !1
}, ClusterIcon.prototype.show = function() {
    if (this.div_) {
        var t = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(t), this.div_.style.display = ""
    }
    this.visible_ = !0
}, ClusterIcon.prototype.remove = function() {
    this.setMap(null)
}, ClusterIcon.prototype.onRemove = function() {
    this.div_ && this.div_.parentNode && (this.hide(), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
}, ClusterIcon.prototype.setSums = function(t) {
    this.sums_ = t, this.text_ = t.text, this.index_ = t.index, this.div_ && (this.div_.innerHTML = t.text), this.useStyle()
}, ClusterIcon.prototype.useStyle = function() {
    var t = Math.max(0, this.sums_.index - 1);
    t = Math.min(this.styles_.length - 1, t);
    var e = this.styles_[t];
    this.url_ = e.url, this.height_ = e.height, this.width_ = e.width, this.textColor_ = e.textColor, this.anchor_ = e.anchor, this.textSize_ = e.textSize, this.backgroundPosition_ = e.backgroundPosition, this.iconAnchor_ = e.iconAnchor
}, ClusterIcon.prototype.setCenter = function(t) {
    this.center_ = t
}, ClusterIcon.prototype.createCss = function(t) {
    var e = [];
    e.push("background-image:url(" + this.url_ + ");");
    var r = this.backgroundPosition_ ? this.backgroundPosition_ : "0 0";
    e.push("background-position:" + r + ";"), "object" == typeof this.anchor_ ? ("number" == typeof this.anchor_[0] && this.anchor_[0] > 0 && this.anchor_[0] < this.height_ ? e.push("height:" + (this.height_ - this.anchor_[0]) + "px; padding-top:" + this.anchor_[0] + "px;") : "number" == typeof this.anchor_[0] && this.anchor_[0] < 0 && -this.anchor_[0] < this.height_ ? e.push("height:" + this.height_ + "px; line-height:" + (this.height_ + this.anchor_[0]) + "px;") : e.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px;"), "number" == typeof this.anchor_[1] && this.anchor_[1] > 0 && this.anchor_[1] < this.width_ ? e.push("width:" + (this.width_ - this.anchor_[1]) + "px; padding-left:" + this.anchor_[1] + "px;") : e.push("width:" + this.width_ + "px; text-align:center;")) : e.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px; width:" + this.width_ + "px; text-align:center;");
    var s = this.textColor_ ? this.textColor_ : "black",
        o = this.textSize_ ? this.textSize_ : 11;
    return e.push("cursor:pointer; top:" + t.y + "px; left:" + t.x + "px; color:" + s + "; position:absolute; font-size:" + o + "px; font-family:Arial,sans-serif; font-weight:bold"), e.join("")
}, window.MarkerClusterer = MarkerClusterer, MarkerClusterer.prototype.addMarker = MarkerClusterer.prototype.addMarker, MarkerClusterer.prototype.addMarkers = MarkerClusterer.prototype.addMarkers, MarkerClusterer.prototype.clearMarkers = MarkerClusterer.prototype.clearMarkers, MarkerClusterer.prototype.fitMapToMarkers = MarkerClusterer.prototype.fitMapToMarkers, MarkerClusterer.prototype.getCalculator = MarkerClusterer.prototype.getCalculator, MarkerClusterer.prototype.getGridSize = MarkerClusterer.prototype.getGridSize, MarkerClusterer.prototype.getExtendedBounds = MarkerClusterer.prototype.getExtendedBounds, MarkerClusterer.prototype.getMap = MarkerClusterer.prototype.getMap, MarkerClusterer.prototype.getMarkers = MarkerClusterer.prototype.getMarkers, MarkerClusterer.prototype.getMaxZoom = MarkerClusterer.prototype.getMaxZoom, MarkerClusterer.prototype.getStyles = MarkerClusterer.prototype.getStyles, MarkerClusterer.prototype.getTotalClusters = MarkerClusterer.prototype.getTotalClusters, MarkerClusterer.prototype.getTotalMarkers = MarkerClusterer.prototype.getTotalMarkers, MarkerClusterer.prototype.redraw = MarkerClusterer.prototype.redraw, MarkerClusterer.prototype.removeMarker = MarkerClusterer.prototype.removeMarker, MarkerClusterer.prototype.removeMarkers = MarkerClusterer.prototype.removeMarkers, MarkerClusterer.prototype.resetViewport = MarkerClusterer.prototype.resetViewport, MarkerClusterer.prototype.repaint = MarkerClusterer.prototype.repaint, MarkerClusterer.prototype.setCalculator = MarkerClusterer.prototype.setCalculator, MarkerClusterer.prototype.setGridSize = MarkerClusterer.prototype.setGridSize, MarkerClusterer.prototype.setMaxZoom = MarkerClusterer.prototype.setMaxZoom, MarkerClusterer.prototype.onAdd = MarkerClusterer.prototype.onAdd, MarkerClusterer.prototype.draw = MarkerClusterer.prototype.draw, Cluster.prototype.getCenter = Cluster.prototype.getCenter, Cluster.prototype.getSize = Cluster.prototype.getSize, Cluster.prototype.getMarkers = Cluster.prototype.getMarkers, ClusterIcon.prototype.onAdd = ClusterIcon.prototype.onAdd, ClusterIcon.prototype.draw = ClusterIcon.prototype.draw, ClusterIcon.prototype.onRemove = ClusterIcon.prototype.onRemove;

jQuery( function($) {
jQuery('.vc_tta-tab a').on('click', function( e ){
setTimeout( function() { 
jQuery('html, body').stop().stop();
console.log('scrolling stopped');
}, 100 );
});
jQuery(document).ready(function() {
    jQuery('.vc_tta.vc_general .vc_tta-panel-title > a, .vc_tta.vc_general .vc_tta-panel-title > a, .vc_tta-tab a').off('click touchstart touchend');
});
});

// MycoMMENT

